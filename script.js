  var a = [
    ["", 1, 2, 3],
    [1, "", 0, 0],
    [2, 0, "", 0],
    [3, 0, 0, ""],
  ];
  var matriceA =[,[,0,0,0],[,0,0,0],[,0,0,0]];
  var text;
  var rowNumber = 3;
  var cellNumber = [1, 1, 1];
  var tabelm = [Array(3), Array(3), Array(3)];
  var tabelAdiacenta;
  var current=1;
  var currentparcurgere='BF';
  for (var i = 0; i < 3; i++) {
    tabelm[i][0] = i + 1;
  }
  ///////////////////////////////////////////////////////////////////////////////
  function createTable(tableData, g, conditii, classnametabel, tdname) {
    if (document.getElementById(g).childNodes[0]) {
      document.getElementById(g).removeChild(document.getElementById(g).childNodes[0]);
    }
    var div = document.createElement('div');
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    table.className = classnametabel;
    table.setAttribute('id', classnametabel);
    div.setAttribute('id', classnametabel + 'div');
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
    document.getElementById(g).appendChild(div);
  }

  function conditiimatrice(index, index2, cellData, cell) {
    if (index == 0) {
      cell.className = "row";
    }
    if (index2 == 0) {
      cell.className = "collumn";
    }
    if (cellData == "0") {
      cell.className = "zero";
    } else if (cellData === "") {
      cell.className = "diag";
    }

  }
  createTable(a, "g3", conditiimatrice, 'matrice','');
  ///////////////////////////////////////////////////////////////////////////////
  function createTableLeft(tableData, g) {
    var container= document.createElement('div');
    container.setAttribute("id", "table2container");
    var table = document.createElement('table');
    table.className = "table2";
    table.setAttribute("id", "table2");
    tableData.forEach(function(rowData, index) {
      var row = document.createElement('tr');
      row.className = "tr";
      row.setAttribute("id", "tr" + (index + 1));
      rowData.forEach(function(cellData, index2) {
        var cell = document.createElement('td');
        cell.className = "td";
        cell.setAttribute("id", "td" + (index2 + 1));
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
      createleftbuttons(index);
      table.appendChild(row);
    });
    container.appendChild(table);
    document.getElementById(g).insertBefore(container, document.getElementById(g).childNodes[0]);
  }
  createTableLeft(tabelm, "table")
  ///////////////////////////////////////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////////////////////////
  function createleftbuttons(x) {
    var allbtndiv = document.getElementById('allbtndiv');
    var btndiv = document.createElement('div'); //BUTOANE
    btndiv.className = "btndiv";
    btndiv.setAttribute("id", "btndiv" + (x + 1));
    var button = document.createElement("button");
    button.setAttribute("onclick", "addCell(" + (x + 1) + ")");
    button.setAttribute("id", "add" + (x + 1));
    button.className = "btnadd";
    button.innerHTML="<p>+</p>";
    btndiv.appendChild(button);
    var button = document.createElement("button");
    button.setAttribute("onclick", "deleteCell(" + (x + 1) + ")");
    button.setAttribute("id", "remove" + (x + 1));
    button.setAttribute("disabled", "");
    button.className = "btnremove";
    button.innerHTML="<p>-</p>";
    btndiv.appendChild(button);
    allbtndiv.insertBefore(btndiv, allbtndiv.childNodes[-1]);
  }
  ///////////////////////////////////////////////////////////////////////////////
  function addmatrice() {
    var row = document.getElementById("matrice").insertRow(rowNumber);
    row.setAttribute("id", "mrow" + rowNumber);
    for (var i = 0; i <= rowNumber; i++) {
      var row2 = document.getElementById('mrow' + i);
      var cell = document.createElement('td');
      cell.setAttribute("id", "td" + rowNumber + "-" + i);
      var cell2 = row2.insertCell(-1);
      cell2.setAttribute("id", "td" + i + "-" + rowNumber);
      if (i == 0) {
        cell.appendChild(document.createTextNode(rowNumber));
        cell.className = "row";
        cell2.appendChild(document.createTextNode(rowNumber));
        cell2.className = "row";
      } else if (i == rowNumber) {
        cell.appendChild(document.createTextNode(''));
        cell.className = "diag";
        row2.deleteCell(-1);
      } else {
        cell.appendChild(document.createTextNode('0'));
        cell.className = "zero";
        cell2.appendChild(document.createTextNode('0'));
        cell2.className = "zero";
      }
      row.appendChild(cell);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////////////////////////
  function deleteMatrice() {
    var row = document.getElementById("matrice").deleteRow(-1);
    for (var i = 0; i < rowNumber; i++) {
      document.getElementById('mrow' + i).deleteCell(-1);
    }
  }
  ///////////////////////////////////////////////////////////////////////////////
  function deleteCell(x) {
    var table = document.getElementById("table2");
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
  ///////////////////////////////////////////////////////////////////////////////
  function change(rownum, cellnum) {
    var cell = document.getElementById(rownum + '-' + cellnum);
    if (cell.firstChild.value <= 0 || cell.firstChild.value == rownum || cell.firstChild.value > rowNumber || isNaN(parseInt(cell.firstChild.value))) {
      cell.firstChild.value = "";
      cell.firstChild.focus();
      return;
    }
    for (var i = 1; i < cellNumber[rownum - 1] - 1; i++) {
      if (document.getElementById("tr" + rownum).childNodes[i].firstChild.value == cell.firstChild.value) {
        cell.firstChild.value = "";
        cell.firstChild.focus();
        return;
      }
    }
    text = parseInt(cell.firstChild.value);
    cell.firstChild.blur();
    addCell(text, rownum);
    document.getElementById("td" + text + "-" + rownum).innerText = 1;
    document.getElementById("td" + rownum + "-" + text).innerText = 1;
    document.getElementById("td" + text + "-" + rownum).classList.add("one");
    document.getElementById("td" + rownum + "-" + text).classList.add("one");
    generareTabelAdiacenta();
    eval("parcurgere"+currentparcurgere)(current);
  }
  ///////////////////////////////////////////////////////////////////////////////
  function ifComplete() {
    for (var i = 0; i <= rowNumber; i++) {
      if (cellNumber[i] != 1) {
        for (var j = 1; j < cellNumber[i]; j++) {
          if (document.getElementById("tr" + (i + 1)).childNodes[j].firstChild.value == 0)
            return false;
        }
      }
    }
  }

  function ifRowInCell() {
    for (var i = 0; i < rowNumber - 1; i++) {

      if (cellNumber[i] != 1) {
        for (var j = 1; j < cellNumber[i]; j++) {
          if (document.getElementById("tr" + (i + 1)).childNodes[j].firstChild.value == rowNumber) {
            document.getElementById("tr" + (i + 1)).deleteCell(j);
            for (var k = j; k < cellNumber[i] - 1; k++) {
              document.getElementById("tr" + (i + 1)).childNodes[k].setAttribute("id", (i + 1) + "-" + (k + 1));
            }
            j--;
            cellNumber[i]--;
            if (cellNumber[i] == 1) {
              document.getElementById("remove" + (i + 1)).setAttribute("disabled", "");
            }
          }
        }
      }
    }
  }
  function updateMatriceA() {
    for (var i = 1; i <= rowNumber; i++) {
            matriceA[i].fill(0);
      if (cellNumber[i-1] != 1) {
        for (var j = 1; j < cellNumber[i-1]; j++) {
          matriceA[i][document.getElementById("tr" + (i)).childNodes[j].firstChild.value]=1;
        }
      }
    }
  }
  function conditiiTabel(index, index2, cellData, cell) {
    if (index == 0) {
      cell.className = "row";
    }
    if (cellData == "0") {
      cell.className = "zero";
    }
    cell.classList.add('celladiacenta');
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
  generareTabelAdiacenta();
{
  var s1 = document.getElementById('allbtndiv');
  var s2 = document.getElementById('table2container');

  function select_scroll_1(e) { s2.scrollTop = s1.scrollTop; }
  function select_scroll_2(e) { s1.scrollTop = s2.scrollTop; }

  s1.addEventListener('scroll', select_scroll_1, false);
  s2.addEventListener('scroll', select_scroll_2, false);
}
function openParcurgere(evt, parcurgere) {
  currentparcurgere=parcurgere;
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(parcurgere).style.display = "flex";
  evt.currentTarget.className += " active";
  eval("parcurgere"+currentparcurgere)(current);
  document.getElementById("current"+currentparcurgere).innerHTML=current;
}
function openMain(evt, main) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent2");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks2");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(main).style.display = "flex";
  evt.currentTarget.className += " active";
  makeCanvas();
}
function parcurgereBF(i){
    updateMatriceA();
  var viz=[];
  var c=[];
  viz.length=rowNumber+1;
  viz.fill(0,1);
  c.length=rowNumber+1;
  var p=1;
  var u=1;
  c[1]=i;
  viz[i]=1;
  var loop=1;
  while (p<=u) {
    var x=c[p];
    for(var j=1; j<=rowNumber; j++)
    {
      if(matriceA[x][j]==1 && viz[j]==0){
        viz[j]=1;
        u++;
        c[u]=j;
      }
    }
    p++;
    console.log(u+","+p);
  }
createTableArray(c, "g2", conditiiArray, 'parcurgeretabel','BF');
}

function parcurgereDF(i){
  updateMatriceA();
  var viz=[];
  var c=[];
  var l;
  var i;
function parcurgere(i){
  for (var j=1;j<=rowNumber;j++){
        if (matriceA[i][j]==1 & viz[j]==0)
        {
            c[l]=j;
            viz[j]=1;
            l++;
            parcurgere(j);
        }
      }
}
  c=[];
  viz.length=rowNumber+1;
  viz.fill(0,1);
  c.length=rowNumber+1;
  l=2;
  viz[i]=1;
    c[1]=i;
    parcurgere(i);
    createTableArray(c, "g2", conditiiArray, 'parcurgeretabel','DF');
}
function conditiiArray(index, cell) {
  if (index == 1) {
    cell.className = "row";
  }
  cell.classList.add('cellArray');
}

function createTableArray(tableData, g, conditii, classnametabel, tdname) {
if (document.getElementById(classnametabel)) {
 document.getElementById(classnametabel).parentNode.removeChild(document.getElementById(classnametabel));
}
  var div = document.getElementById(tdname);
  var table = document.createElement('table');
  var tbody = document.createElement('tbody');
  table.className = classnametabel;
  table.setAttribute('id', classnametabel);

    rowData=tableData.length;
    for(var i=1; i<rowData;i++) {
      if(tableData[i]==undefined){
        continue;
      }
      var row = document.createElement('tr');
      row.setAttribute("id", "arow" + i);
      var cell = document.createElement('td');
      cell.setAttribute("id", "td"+tdname+ i + "-" + 1);
      conditii(i , cell);
      cell.appendChild(document.createTextNode(tableData[i]));
      row.appendChild(cell);
      table.appendChild(row);
    }

    div.appendChild(table);
  document.getElementById(g).appendChild(div);
}
function right(x){
  if(current!=rowNumber){
    current++;
  }
  else {
    current=1;
  }
  document.getElementById("current"+x).innerHTML=current;
  eval("parcurgere"+x)(current);
}
function left(x){
  if(current!=1){
    current--;
  }
  else {
    current=rowNumber;
  }
  document.getElementById("current"+x).innerHTML=current;
  eval("parcurgere"+x)(current);
}
document.getElementById("defaultOpen").click();
document.getElementById("defaultOpen2").click();


function makeCanvas(){

var c=document.querySelector("canvas");
var container=document.getElementById("canvasContainer");
var ctx = c.getContext("2d");

c.width=container.offsetWidth*2;
c.height=container.offsetHeight*2;


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

c.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  console.log(message);
}, false);


var x=c.width;
var y=c.height;
var smaller;
if (x<y) {
  smaller=x;
}
else {
  smaller=y;
}
var x2=1.5*Math.PI;
var y2=x2 + 2*Math.PI/rowNumber;
var radius=0.8;
var cx=[];
var cy=[];

  ctx.strokeStyle = "#1D262B";
  ctx.lineWidth = 10;
for (var i = 1; i <=rowNumber; i++) {
  cx[i] = x/2 + smaller/2*radius*Math.cos(x2);
  cy[i] = y/2 + smaller/2*radius*Math.sin(x2);
  ctx.arc(x/2, y/2, smaller/2*radius, x2,y2,false);

  ctx.beginPath();
  ctx.arc(cx[i], cy[i], smaller/2*0.15, 0,Math.PI*2,false);
    ctx.fillStyle = "#161D21";
      ctx.fill();
      ctx.stroke();
    ctx.fillStyle = "#D19738";
    ctx.textAlign = "center";
    ctx.font = "bold 24px consolas";
    ctx.fontWeight = "bold";
    ctx.textBaseline = "middle";
  ctx.fillText(i, cx[i], cy[i]+2 ,);
  x2=y2;
  y2=x2 + 2*Math.PI/rowNumber;
}
ctx.closePath();
ctx.beginPath();
    ctx.globalCompositeOperation='destination-over';
    ctx.lineWidth = 10;
    for (var i = 1; i < rowNumber; i++){
      for (var j = i; j <= rowNumber; j++) {
        if (matriceA[i][j]==1) {
          ctx.moveTo(cx[i],cy[i]);
          ctx.lineTo(cx[j],cy[j]);
        }
      }
    }
ctx.stroke();
}
makeCanvas();
window.onresize=makeCanvas;
window.onzoom=makeCanvas;
