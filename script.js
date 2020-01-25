var a = [
  ["", 1, 2, 3, 4, 5, 6, 7, 8], //0
  [1, "", 0, 0, 0, 0, 0, 0, 0], //1
  [2, 0, "", 0, 0, 0, 0, 0, 0], //2
  [3, 0, 0, "", 0, 0, 0, 0, 0], //3
  [4, 0, 0, 0, "", 0, 0, 0, 0], //4
  [5, 0, 0, 0, 0, "", 0, 0, 0], //5
  [6, 0, 0, 0, 0, 0, "", 0, 0], //6
  [7, 0, 0, 0, 0, 0, 0, "", 0], //7
  [8, 0, 0, 0, 0, 0, 0, 0, ""], //8
] //0  1  2  3  4  5  6  7  8
;

function generare() {
  for (var i = 1; i < a.length; i++) {
    for (var j = i + 1; j < a.length; j++) {
      a[i][j] = Math.round(Math.random());
      a[j][i] = a[i][j];
    }
  }
}
generare();
console.log(a);

function createTable(tableData, g) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData, index) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData, index2) {
      var cell = document.createElement('td');
      if (index == 0) {
        cell.className = "row";
      }
      if (index2 == 0) {
        cell.className = "collumn";
      }
      if (cellData == "0") {
        cell.className = "zero";
      }
      if ((cellData == "1") && (cell.className != "collumn") && (cell.className != "row")) {
        cell.className = "one";
      }
      if (cellData === "") {
        cell.className = "diag";
      }
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.getElementById(g).appendChild(table);
}
createTable(a, "g3");
/*
var tabelm=[Array(3),Array(3),Array(3)];
console.log(tabelm);
tabelm.push(Array(3))
console.log(tabelm);
tabelm[0].push("");
console.log(tabelm);
*/
var rowNumber=3;
var cellNumber=[1,1,1];
var tabelm = [Array(3), Array(3), Array(3)];
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 1; j++) {
    if (j == 0) {
      tabelm[i][j] = i + 1;
    } else {
      tabelm[i][j] = "?";
    }
  }
}

function createTableM(tableData, g) {
  var table = document.createElement('table');
  table.className = "table2";
  table.setAttribute("id", "table2");
  tableData.forEach(function(rowData, index) {
    var row = document.createElement('tr');
    row.className = "tr";
    row.setAttribute("id", "tr"+(index+1));
    rowData.forEach(function(cellData, index2) {
      var cell = document.createElement('td');
      cell.className = "td";
      cell.setAttribute("id", "td"+(index2+1));
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);

    });
    var button = document.createElement("button");
    button.setAttribute("onclick","addCell("+(index+1)+")");
    button.className= "btnadd";
    button.innerHTML="+";
    row.appendChild(button);
    var button = document.createElement("button");
    button.setAttribute("onclick","deleteCell("+(index+1)+")");
    button.className= "btnremove";
    button.innerHTML="−";
    row.appendChild(button);
    table.appendChild(row);
  });
/*    var button = document.createElement("button");
    button.setAttribute("onclick","addRow(rowNumber)");
    table.appendChild(button);*/
  document.getElementById(g).insertBefore(table,document.getElementById(g).childNodes[0]);
}
createTableM(tabelm, "g1")

function addRow(){
var table = document.getElementById("table2");
var row = table.insertRow(rowNumber);
row.className = "tr";
row.setAttribute("id", "tr"+(rowNumber+1));
var cell = row.insertCell(0);
cell.className = "td";
cellNumber.push(1);
cell.setAttribute("id", "td"+(cellNumber[rowNumber]));
cell.appendChild(document.createTextNode(rowNumber+1));
var button = document.createElement("button");
button.setAttribute("onclick","addCell("+(rowNumber+1)+")");
button.className= "btnadd";
button.innerHTML="+";
row.appendChild(button);
var button = document.createElement("button");
button.setAttribute("onclick","deleteCell("+(rowNumber+1)+")");
button.className= "btnremove";
button.innerHTML="−";
row.appendChild(button);
rowNumber++;
}

function addCell(x){
var table = document.getElementById("table2");
var row = document.getElementById("tr"+x);
var cell = row.insertCell(-1);
cell.className = "td";
cell.setAttribute("id", "td"+(cellNumber[x-1]+1));
cell.appendChild(document.createTextNode(cellNumber[x-1]));
cellNumber[x-1]++;
}
function deleteRow(){
  document.getElementById("table2").deleteRow(-1);
  rowNumber--;
}
function deleteCell(x){
  var table = document.getElementById("table2");
  var row = document.getElementById("tr"+x);
  row.deleteCell(cellNumber[x-1]-1);
  cellNumber[x-1]--;
}
