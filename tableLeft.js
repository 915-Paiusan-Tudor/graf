function addRow() {
  if (openInput != 0) {
    alert("Please enter a node");
    return;
  }
  rowNumber++;
  matriceA[0].push(rowNumber);
  matriceA.push([0]);
  for (var i = 1; i <= rowNumber; i++) {
    for (var j = 1; j <= rowNumber; j++) {
      if (matriceA[i].length != rowNumber + 1) {
        matriceA[i].push(0);
      }
    }
    matriceA[i][0] = i;
    matriceA[i][i] = "";
  }

  updateTableLeft();

  updateButtons();


  generareTabelAdiacenta();
  makeCanvas();
  createMatriceIncidenta();
  createMatriceDrum();
  if (currentMatrice==="matriceI") {
      createTable(matriceI, "g3", conditiimatrice, 'matrice', 'matrice', "matrice");
  }
  else if (currentMatrice==="matriceA") {
      createTable(matriceA, "g3", conditiimatrice, 'matrice', 'matrice', "matrice");
  }
  else {
      createTable(matriceD, "g3", conditiimatrice, 'matrice', 'matrice', "matrice");
  }
}

function deleteRow() {
  if (openInput != 0) {
    alert("Please enter a node");
    return;
  }
  rowNumber--;
  tableLeft.pop();
  matriceA.pop();
  for (var i = 0; i <= rowNumber; i++) {
    matriceA[i].pop();
  }
  updateTableLeft();
  updateButtons();
  checkButtons();
  generareTabelAdiacenta();
  createMatriceIncidenta();
  createMatriceDrum();
  eval("parcurgere" + currentparcurgere)(current);
  makeCanvas();
  if (currentMatrice==="matriceI") {
      createTable(matriceI, "g3", conditiimatrice, 'matrice', 'matrice', "matrice");
  }
  else if (currentMatrice==="matriceA") {
      createTable(matriceA, "g3", conditiimatrice, 'matrice', 'matrice', "matrice");
  }
  else {
      createTable(matriceD, "g3", conditiimatrice, 'matrice', 'matrice', "matrice");
  }
}
function checkButtons() {
  for (var i = 1; i < tableLeft.length; i++) {
    if (tableLeft[i].length == rowNumber && !document.getElementById("add" + i).hasAttribute("disabled")) {
      document.getElementById("add" + i).setAttribute("disabled", "");
    } else if (tableLeft[i].length != rowNumber && document.getElementById("add" + i).hasAttribute("disabled")) {
      document.getElementById("add" + i).attributes.removeNamedItem("disabled");
    } else if (tableLeft[i].length == 1 && !document.getElementById("remove" + i).hasAttribute("disabled")) {
      document.getElementById("remove" + i).setAttribute("disabled", "");
    } else if (tableLeft[i].length !== 1 && document.getElementById("remove" + i).hasAttribute("disabled")) {
      document.getElementById("remove" + i).attributes.removeNamedItem("disabled");

    }
  }
  if (rowNumber == 3 && !document.getElementById("removetop").hasAttribute("disabled")) {
    document.getElementById("removetop").setAttribute("disabled", "");
  } else if (rowNumber != 3 && document.getElementById("removetop").hasAttribute("disabled")) {
    document.getElementById("removetop").attributes.removeNamedItem("disabled");
  } else if (rowNumber == 8 && !document.getElementById("addtop").hasAttribute("disabled")) {
    document.getElementById("addtop").setAttribute("disabled", "");
  } else if (rowNumber != 8 && document.getElementById("addtop").hasAttribute("disabled")) {
    document.getElementById("addtop").attributes.removeNamedItem("disabled");
  }
}
function updateButtons() {
  if (btnNumber < rowNumber) {
    for (btnNumber; btnNumber < rowNumber; btnNumber++) {
      createleftbuttons(btnNumber + 1);
    }
  } else if (btnNumber > rowNumber) {
    document.getElementById("btndiv" + btnNumber).remove();
    btnNumber--;
  }
  checkButtons();

  s2 = document.getElementById('tableLeftdiv');


  function select_scroll_2(e) {
    s1.scrollTop = s2.scrollTop;
  }
  s2.addEventListener('scroll', select_scroll_2, false);
}

function createleftbuttons(x) {
  var allbtndiv = document.getElementById('allbtndiv');
  var btndiv = document.createElement('div'); //BUTOANE
  btndiv.className = "btndiv";
  btndiv.setAttribute("id", "btndiv" + (x));
  var button = document.createElement("button");
  button.setAttribute("onclick", "addCell(" + (x) + ")");
  button.setAttribute("id", "add" + (x));
  button.className = "btnadd";
  button.innerHTML = "<p>+</p>";
  btndiv.appendChild(button);
  var button = document.createElement("button");
  button.setAttribute("onclick", "deleteCell(" + (x) + ")");
  button.setAttribute("id", "remove" + (x));
  button.setAttribute("disabled", "");
  button.className = "btnremove";
  button.innerHTML = "<p>-</p>";
  btndiv.appendChild(button);
  allbtndiv.insertBefore(btndiv, allbtndiv.childNodes[-1]);
}

function addCell(x, y) {
  if (openInput == x) {
    alert("Please enter a node");
    return;
  }
  openInput = x;
  var table = document.getElementById("table2");
  var row = document.getElementById("tr" + x);
  var cell = row.insertCell(-1);
  var button = document.getElementById("remove" + x);
  cell.className = "td";
  cell.setAttribute("id", x + "-" + tableLeft[x].length);
  cell.innerHTML = '<input type="text" class="inputnode" maxlength="1" onkeyup="blur()" placeholder="0" onchange="change(' + x + ',' + tableLeft[x].length + ')"></input>';
  cell.firstChild.focus();
  if (y) {
    cell.firstChild.value = y;
    cell.firstChild.blur();
  }
}
function deleteCell(x) {
  if (openInput == x) {
    openInput = 0;
  } else if (openInput != 0) {
    alert("Please enter a node");
    return;
  }
  var row = document.getElementById("tr" + x);
  var y = parseInt(row.lastChild.innerText);
  if (y) {
    matriceA[x][y] = 0;
    matriceA[y][x] = 0;
  }

  updateTableLeft();
  checkButtons();
  generareTabelAdiacenta();
  eval("parcurgere" + currentparcurgere)(current);
}
function change(rownum, cellnum) {
  var cell = document.getElementById(rownum + '-' + cellnum);
  var ok = 1;
  if (cell.firstChild.value <= 0 || cell.firstChild.value == rownum || cell.firstChild.value > rowNumber || isNaN(parseInt(cell.firstChild.value))) {
    cell.firstChild.value = "";
    cell.firstChild.focus();
    ok = 0;
  }
  for (var j = 1; j < tableLeft[rownum].length; j++) {
    if (document.getElementById("tr" + rownum).childNodes[j].innerText == cell.firstChild.value) {
      cell.firstChild.value = "";
      cell.firstChild.focus();
      ok = 0;
    }
  }

  if (ok) {
    openInput = 0;
    text = parseInt(cell.firstChild.value);
    cell.firstChild.blur();
    matriceA[rownum][text] = 1;
    if (!isDirected) {
      matriceA[text][rownum] = 1;
    }
    updateTableLeft();
    checkButtons();
  }
  updateAll();
}
