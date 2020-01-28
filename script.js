  var a = [
  ["", 1, 2, 3],
  [1, "", 0, 0],
  [2, 0, "", 0],
  [3, 0, 0, ""],
];
  var text;
  var rowNumber = 3;
  var cellNumber = [1, 1, 1];
  var tabelm = [Array(3), Array(3), Array(3)];

for (var i = 0; i < 3; i++) {
      tabelm[i][0] = i + 1;
}
///////////////////////////////////////////////////////////////////////////////
function createTable(tableData) {
  var table = document.createElement('table');
    table.setAttribute('id', 'matrice');
  tableData.forEach(function(rowData, index) {
    var row = document.createElement('tr');
      row.setAttribute("id", "mrow" + index);
      rowData.forEach(function(cellData, index2) {
        var cell = document.createElement('td');
          cell.setAttribute("id", "td" + index + "-" + index2);
          if (index == 0) {
            cell.className = "row";
          }
          if (index2 == 0) {
            cell.className = "collumn";
          }
          if (cellData == "0") {
            cell.className = "zero";
          }
          if (cellData === "") {
            cell.className = "diag";
          }
          cell.appendChild(document.createTextNode(cellData));
          row.appendChild(cell);
        });
      table.appendChild(row);
    });
  document.getElementById("g3").appendChild(table);
}
createTable(a);
///////////////////////////////////////////////////////////////////////////////
function createTableLeft(tableData, g) {
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
  document.getElementById(g).insertBefore(table, document.getElementById(g).childNodes[0]);
}
createTableLeft(tabelm, "g1")
///////////////////////////////////////////////////////////////////////////////
function addRow(){
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
      document.getElementsByClassName('btnadd')[i + 1].attributes.removeNamedItem("disabled");
    }
  }

  rowNumber++;

  addmatrice();
}
///////////////////////////////////////////////////////////////////////////////
function createleftbuttons(x){
  var btndiv = document.createElement('div'); //BUTOANE
    btndiv.className = "btndiv";
    btndiv.setAttribute("id", "btndiv" + (x + 1));
  var button = document.createElement("button");
    button.setAttribute("onclick", "addCell(" + (x + 1) + ")");
    button.setAttribute("id", "add" + (x + 1));
    button.className = "btnadd";
    btndiv.appendChild(button);
  var button = document.createElement("button");
    button.setAttribute("onclick", "deleteCell(" + (x + 1) + ")");
    button.setAttribute("id", "remove" + (x + 1));
    button.setAttribute("disabled", "");
    button.className = "btnremove";
    btndiv.appendChild(button);
  document.getElementById("g0").insertBefore(btndiv, document.getElementById("g0").childNodes[-1]);
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
      cell2.setAttribute("id","td" + i + "-" + rowNumber);
    if (i == 0) {
      cell.appendChild(document.createTextNode(rowNumber));
      cell.className = "row";
      cell2.appendChild(document.createTextNode(rowNumber));
      cell2.className = "row";
      }
    else if (i == rowNumber) {
        cell.appendChild(document.createTextNode(''));
        cell.className = "diag";
      row2.deleteCell(-1);
      }
      else {
        cell.appendChild(document.createTextNode('0'));
        cell.className = "zero";
        cell2.appendChild(document.createTextNode('0'));
        cell2.className = "zero";
      }
    row.appendChild(cell);
  }
}
///////////////////////////////////////////////////////////////////////////////
function addCell(x,y) {
  var table = document.getElementById("table2");
  var row = document.getElementById("tr" + x);
  var cell = row.insertCell(-1);
  var button = document.getElementById("remove" + x);
    cell.className = "td";
    cell.setAttribute("id", x + "-" + (cellNumber[x - 1] + 1));
    cell.innerHTML='<input type="text" class="inputnode" maxlength="1" onkeyup="blur()" onchange="change('+ x + ',' + (cellNumber[x - 1] + 1) + ')"></input>';
    cell.firstChild.focus();
  if (y) {
    cell.firstChild.value=y;
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

  for (var i = 0; i < cellNumber.length; i++) {
    if (cellNumber[i]==rowNumber) {
      deleteCell(i+1);
      document.getElementById("add" + (i+1)).setAttribute("disabled", "");
    }
  }
  rowNumber--;
}
///////////////////////////////////////////////////////////////////////////////
function deleteMatrice(){
  var row = document.getElementById("matrice").deleteRow(-1);
  for (var i = 0; i < rowNumber; i++) {
    document.getElementById('mrow' + i).deleteCell(-1);
  }
}
///////////////////////////////////////////////////////////////////////////////
function deleteCell(x) {
  var table = document.getElementById("table2");
  var row = document.getElementById("tr" + x);

  if (row.lastChild.firstChild.value!=""){
  text=parseInt(row.lastChild.firstChild.value);
    document.getElementById("td"+text+"-"+x).innerText=0;
    document.getElementById("td"+x+"-"+text).innerText=0;
    document.getElementById("td"+text+"-"+x).classList.remove("one");
    document.getElementById("td"+x+"-"+text).classList.remove("one");
  }
  console.log(cellNumber[x - 1]);
var y=parseInt(row.lastChild.firstChild.value);
console.log(isNaN(y));
  if(isNaN(y)==false){
    for (var i = 0; i < cellNumber[y - 1]; i++) {
      if(document.getElementById("td"+text+"-"+i+2)){
        console.log('abc');
      }
    }
  }
  row.deleteCell(cellNumber[x - 1] - 1);
  cellNumber[x - 1]--;

  if (cellNumber[x - 1] == 1) {
    document.getElementById("remove" + x).setAttribute("disabled", "");
  }
  if (cellNumber[x - 1] == rowNumber-1) {
    document.getElementById("add" + x).attributes.removeNamedItem("disabled");
  }
}
///////////////////////////////////////////////////////////////////////////////
function change(rownum,cellnum){
var cell = document.getElementById(rownum + '-' + cellnum);
  if (cell.firstChild.value <= 0|| cell.firstChild.value==rownum || cell.firstChild.value>rowNumber || isNaN(parseInt(cell.firstChild.value))) {
    cell.firstChild.value="";
    cell.firstChild.focus();
  }
  else {
      text = parseInt(cell.firstChild.value);
      cell.firstChild.blur();
      addCell(text,rownum);                                            //add mirror
      document.getElementById("td"+text+"-"+rownum).innerText=1;
      document.getElementById("td"+rownum+"-"+text).innerText=1;
      document.getElementById("td"+text+"-"+rownum).classList.add("one");
      document.getElementById("td"+rownum+"-"+text).classList.add("one");
  }
}
///////////////////////////////////////////////////////////////////////////////
