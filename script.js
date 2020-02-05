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
  var tabelAdiacenta;
  var parcurgere= Array(2);
  console.log(document.getElementById("parcurgere"+i));
for(var i=0;i<2;i++)
{parcurgere.push({
buttonid:document.getElementById("parcurgere"+i),
visibility:false
}
);
}
console.table(parcurgere[0]);
  for (var i = 0; i < 3; i++) {
    tabelm[i][0] = i + 1;
  }
  ///////////////////////////////////////////////////////////////////////////////
  function createTable(tableData, g, conditii, classnametabel) {
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
        cell.setAttribute("id", "td" + index + "-" + index2);
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
  createTable(a, "g3", conditiimatrice, 'matrice');
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
  function addRow() {
    if (ifComplete() == false) {
      alert("Please enter a node");
      return;
    }
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
    generareTabelAdiacenta();
  }
  ///////////////////////////////////////////////////////////////////////////////
  function createleftbuttons(x) {
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
    if (ifComplete() == false) {
      alert("Please enter a node");
      return;
    }
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
    generareTabelAdiacenta();
    rowNumber--;
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
    if (ifComplete() == false) {
      alert("Please enter a node");
      return;
    }
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
            console.log(document.getElementById("tr" + (i + 1)).childNodes[j].firstChild.value + "=" + rowNumber)
            document.getElementById("tr" + (i + 1)).deleteCell(j);
            for (var k = j; k < cellNumber[i] - 1; k++) {
              document.getElementById("tr" + (i + 1)).childNodes[k].setAttribute("id", (i + 1) + "-" + (k + 1));
            }
            j--;
            cellNumber[i]--;
            if (cellNumber[i] == 1) {
              document.getElementById("remove" + (i + 1)).setAttribute("disabled", "");
            }
            if (cellNumber[i] == rowNumber - 1) {
              document.getElementById("add" + (i + 1)).attributes.removeNamedItem("disabled");
            }
          }
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
    createTable(tabelAdiacenta, "g5", conditiiTabel, 'tabelAdiacenta');
  }
  generareTabelAdiacenta();
