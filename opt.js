tableData.forEach(function(rowData, index) {
  var row = document.createElement('tr');
  row.setAttribute("id", "mrow" + index);

  rowData.forEach(function(cellData, index2) {
    var cell = document.createElement('td');
    cell.setAttribute("id", "td"+tdname+ index + "-" + index2);
    conditii(index, index2, cellData, cell);
    cell.appendChild(document.createTextNode(cellData));
    row.appendChild(cell);

  });
  table.appendChild(row);
  div.appendChild(table);
});





function addRow() {

  var table = document.getElementById("table2");

  var row = table.insertRow(-1);
  row.className = "tr";
  row.setAttribute("id", "tr" + (rowNumber + 1));

  var cell = row.insertCell(0);
  cell.className = "td";
  cellNumber.push(1);
  cell.setAttribute("id", "td" + (cellNumber[rowNumber]));
  cell.appendChild(document.createTextNode(rowNumber + 1));

  createleftbuttons(rowNumber);

  if (rowNumber == 3) {
    document.getElementById("removetop").attributes.removeNamedItem("disabled");
  }
  if (rowNumber == 7) {
    document.getElementById("addtop").setAttribute("disabled", "");
  }
  for (var i = 0; i < rowNumber; i++) {
    if (cellNumber[i] == rowNumber) {
      document.getElementsByClassName('btnadd')[i].attributes.removeNamedItem("disabled");
    }
  }

  rowNumber++;
  matriceA.push([,0,0,0])
  for(var i=1;i<=rowNumber;i++){
    while(matriceA[i].length<=rowNumber)
    {
      matriceA[i].push(0);
    }
  }

  addmatrice();
  generareTabelAdiacenta();
  makeCanvas();
}



function addCell(x, y) {
  if (ifComplete() == false) {
    alert("Please enter a node");
    return;
  }
  var table = document.getElementById("table2");
  var row = document.getElementById("tr" + x);
  var cell = row.insertCell(-1);
  var button = document.getElementById("remove" + x);
  cell.className = "td";
  cell.setAttribute("id", x + "-" + (cellNumber[x - 1] + 1));
  cell.innerHTML = '<input type="text" class="inputnode" maxlength="1" onkeyup="blur()" placeholder="0" onchange="change(' + x + ',' + (cellNumber[x - 1] + 1) + ')"></input>';
  cell.firstChild.focus();
  if (y) {
    cell.firstChild.value = y;
    cell.firstChild.blur();
  }
  if (cellNumber[x - 1] == 1) {
    button.attributes.removeNamedItem("disabled");
  }

  cellNumber[x - 1]++;
  if (cellNumber[x - 1] == rowNumber) {
    document.getElementById("add" + x).setAttribute("disabled", "");
  }
}



function deleteRow() {
  document.getElementById("table2").deleteRow(-1);
  document.getElementById("btndiv" + rowNumber).remove();

  if (rowNumber == 4) {
    document.getElementById("removetop").setAttribute("disabled", "");
  }

  if (rowNumber == 8) {
    document.getElementById("addtop").attributes.removeNamedItem("disabled");
  }
  deleteMatrice();
  cellNumber.pop();
  ifRowInCell();
  rowNumber--;
  matriceA.pop();
  for(var i=1;i<=rowNumber;i++){
    matriceA[i].pop();
  }
  generareTabelAdiacenta();
  eval("parcurgere"+currentparcurgere)(current);
  makeCanvas();
}


function deleteCell(x) {
  var table = document.getElementById("tableLeft");
  var row = document.getElementById("tr" + x);
  if (row.lastChild.firstChild.value != "") {
    var y = parseInt(row.lastChild.firstChild.value);
    if (y < rowNumber) {
      document.getElementById("td" + y + "-" + x).innerText = 0;
      document.getElementById("td" + x + "-" + y).innerText = 0;
      document.getElementById("td" + y + "-" + x).classList.remove("one");
      document.getElementById("td" + x + "-" + y).classList.remove("one");
    }
  }
  if (y) {
    for (var i = 0; i < cellNumber[y - 1]; i++) {
      if (document.getElementById("tr" + y).childNodes[i].firstChild.value == x) {
        document.getElementById("tr" + y).deleteCell(i);
        for (var j = i; j < cellNumber[y - 1] - 1; j++) {
          document.getElementById("tr" + y).childNodes[j].setAttribute("id", y + "-" + (j + 1));
        }
        cellNumber[y - 1]--;
        if (cellNumber[y - 1] == 1) {
          document.getElementById("remove" + y).setAttribute("disabled", "");
        }
        if (cellNumber[y - 1] == rowNumber - 1) {
          document.getElementById("add" + y).attributes.removeNamedItem("disabled");
        }
      }
    }
  }
  row.deleteCell(cellNumber[x - 1] - 1);
  cellNumber[x - 1]--;
  if (cellNumber[x - 1] == 1) {
    document.getElementById("remove" + x).setAttribute("disabled", "");
  }
  if (cellNumber[x - 1] == rowNumber - 1) {
    document.getElementById("add" + x).attributes.removeNamedItem("disabled");
  }
  generareTabelAdiacenta();
  eval("parcurgere"+currentparcurgere)(current);
}
function checkButtons(){
  for(var i=1;i<tableLeft.length;i++){
    if(tableLeft[i].length==rowNumber && !document.getElementById("add"+i).hasAttribute("disabled")){
      document.getElementById("add" + i).attributes.addNamedItem("disabled");
    }
    else if (document.getElementById("add"+i).hasAttribute("disabled")) {
      document.getElementById("add" + i).attributes.removeNamedItem("disabled");
    }
    else if (tableLeft[i].length==1 && !document.getElementById("remove"+i).hasAttribute("disabled")) {
      document.getElementById("remove" + i).attributes.addNamedItem("disabled");
    }
    else if (document.getElementById("remove"+i).hasAttribute("disabled")) {
      document.getElementById("remove" + i).attributes.removeNamedItem("disabled");
    }
  }
  if(rowNumber==3 && !document.getElementById("removetop").hasAttribute("disabled")){
      document.getElementById("removetop").attributes.addNamedItem("disabled");
  }
  else if (document.getElementById("removetop").hasAttribute("disabled")) {
      document.getElementById("removetop").attributes.removeNamedItem("disabled");
  }
  else if (rowNumber==8 && !document.getElementById("addtop").hasAttribute("disabled")) {
      document.getElementById("addtop").attributes.addNamedItem("disabled");
  }
  else if (document.getElementById("addtop").hasAttribute("disabled")) {
      document.getElementById("remove").attributes.addNamedItem("disabled");
  }
}
function checkButtons(x,y,act){
  if(x){
  if (tableLeft[x].length == 1) {
    document.getElementById("remove" + x).setAttribute("disabled", "");
  }
  if (tableLeft[x].length == rowNumber) {
    document.getElementById("add" + x).attributes.removeNamedItem("disabled");
  }
  if(y){
  if (tableLeft[y].length == 1) {
    document.getElementById("remove" + y).setAttribute("disabled", "");
  }
  if (tableLeft[y].length == rowNumber) {
    document.getElementById("add" + y).attributes.removeNamedItem("disabled");
  }
}
}
  if(act=="addrow"){
  if (rowNumber == 4 && document.getElementById("removetop").hasAttribute("disabled")) {
    document.getElementById("removetop").attributes.removeNamedItem("disabled");
  }
  if (rowNumber == 8 && !document.getElementById("addtop").hasAttribute("disabled")) {
    document.getElementById("addtop").setAttribute("disabled", "");
  }
  for (var i = 1; i < rowNumber; i++) {
    if (tableLeft[i].length == rowNumber-1) {
      document.getElementById('add'+i).attributes.removeNamedItem("disabled");
    }
  }
}
else if (act=="deleterow") {
  if (rowNumber == 3) {
    document.getElementById("removetop").setAttribute("disabled", "");
  }

  if (rowNumber == 7) {
    document.getElementById("addtop").attributes.removeNamedItem("disabled");
  }
  for (var i = 1; i < rowNumber; i++) {
    if (tableLeft[i].length == rowNumber) {
      document.getElementById('add'+i).setAttribute("disabled", "");
    }
  }
}
}


function generareTabelAdiacenta() {
  tabelAdiacenta = [
    [],
    [],
    []
  ];
  for (var i = 0; i < rowNumber; i++) {
    tabelAdiacenta[1].push(i + 1);
  }
  var k = rowNumber;
  for (var i = 0; i < rowNumber; i++) {
    if (cellNumber[i] > 1) {
      tabelAdiacenta[2][i] = k + 1;
    } else {
      tabelAdiacenta[2][i] = 0;
    }
    for (var j = 1; j < cellNumber[i]; j++) {
      tabelAdiacenta[1].push(parseInt(document.getElementById("tr" + (i + 1)).childNodes[j].firstChild.value));
      if (j != cellNumber[i] - 1) {
        tabelAdiacenta[2][k] = k + 2;
      } else {
        tabelAdiacenta[2][k] = 0;
      }
      k++;
    }

  }
  for (var i = 0; i < k; i++) {
    tabelAdiacenta[0][i] = i + 1;
  }
  createTable(tabelAdiacenta, "g5", conditiiTabel, 'tabelAdiacenta','adiacenta');
}
