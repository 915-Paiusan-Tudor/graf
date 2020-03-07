function createTable(tableData, g, conditii, classnametabel, tdname, rowname) {
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
    row.setAttribute("id", rowname + index);
    row.className = rowname;
    rowData.forEach(function(cellData, index2) {
      var cell = document.createElement('td');
      cell.setAttribute("id", tdname + (index2 + 1));
      cell.className = tdname;
      if (conditii) {
        conditii(index, index2, cellData, cell);
      }
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });
    table.appendChild(row);
    div.appendChild(table);
  });
  document.getElementById(g).insertBefore(div, document.getElementById(g).childNodes[0]);
  if (classnametabel == "tableLeft") {
    var trow = document.createElement('tr');
    document.getElementById(classnametabel).appendChild(trow);
  }
}

function conditiimatrice(index, index2, cellData, cell) {
  if (index == 0) {
    cell.className = "row";
  }
  if (index2 == 0) {
    cell.className = "collumn";
  }
  if (cellData == "0") {
    cell.classList.add("zero", "matriceButtonZero");
    if (index!==index2 && currentMatrice!=="matriceI") {
          cell.setAttribute("onClick", 'matriceToggle(' + index + ',' + index2 + ')');
    }
  }
  if ((cellData == "1" || cellData=="-1") && !(cell.classList.contains("row") || cell.classList.contains("collumn"))) {
    cell.classList.add("one", "matriceButtonOne");
    if (index!==index2 &&currentMatrice!=="matriceI") {
          cell.setAttribute("onClick", 'matriceToggle(' + index + ',' + index2 + ')');
    }
  }
   else if (cellData === "") {
    cell.className = "diag";
  }
}

function updateTableLeft() {
  tableLeft = [
    []
  ];
  for (var i = 1; i <= rowNumber; i++) {
    tableLeft.push([i]);
  }
  if (isDirected) {
    for (var i = 1; i <= rowNumber; i++) {
      for (var j = 1; j <= rowNumber; j++) {
        if (matriceA[i][j] == 1) {
          tableLeft[i].push(j);
        }
      }
    }
  }
  else {
    for (var i = 1; i <= rowNumber; i++) {
      for (var j = i; j <= rowNumber; j++) {
        if (matriceA[i][j] == 1) {
          tableLeft[i].push(j);
          tableLeft[j].push(i);
        }
      }
    }
  }
  createTable(tableLeft, "table", null, 'tableLeft', 'td', "tr");
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
    if (tableLeft[i + 1].length > 1) {
      tabelAdiacenta[2][i] = k + 1;
    } else {
      tabelAdiacenta[2][i] = 0;
    }
    for (var j = 1; j < tableLeft[i + 1].length; j++) {
      tabelAdiacenta[1].push(parseInt(document.getElementById("tr" + (i + 1)).childNodes[j].innerText));
      if (j != tableLeft[i + 1].length - 1) {
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
  createTable(tabelAdiacenta, "g5", conditiiTabel, 'tabelAdiacenta', 'adiacenta', 'adiacenta');
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
function parcurgereBF(i) {
  var viz = [];
  var c = [];
  let currentDepth = 1;
  let includes;
  cdepth = [];
  viz.length = rowNumber + 1;
  viz.fill(0, 1);
  c.length = rowNumber + 1;
  var p = 1;
  var u = 1;
  c[1] = i;
  cdepth[currentDepth] = [i];
  viz[i] = 1;
  while (p <= u) {
    var x = c[p];
    if (cdepth[currentDepth].includes(x)) {
      currentDepth++;
      cdepth.push([]);
    }
    for (var j = 1; j <= rowNumber; j++) {
      if (matriceA[x][j] == 1 && viz[j] == 0) {

        viz[j] = 1;
        u++;
        c[u] = j;
        cdepth[currentDepth].push(j);
      }
    }
    p++;
  }
  for (var k = 1; k <= rowNumber; k++) {
    let isolated = true;
    for (var i = 1; i < cdepth.length; i++) {
      for (var j = 0; j < cdepth[i].length; j++) {
        if (cdepth[i].includes(k)) {
          isolated = false
        }
      }
    }
    if (isolated) {
      cdepth[currentDepth].push(k);
    }
  }
  if (cdepth[currentDepth][0] == undefined) {
    cdepth.pop();
  }
  if (currentparcurgere == "BF") {
    createTableArray(c, "g2", conditiiArray, 'parcurgeretabel', 'BF', "BF");
  }
}

function parcurgereDF(i) {
  var viz = [];
  var c = [];
  var l;
  var i;

  function parcurgere(i) {
    for (var j = 1; j <= rowNumber; j++) {
      if (matriceA[i][j] == 1 & viz[j] == 0) {
        c[l] = j;
        viz[j] = 1;
        l++;
        parcurgere(j);
      }
    }
  }
  c = [];
  viz.length = rowNumber + 1;
  viz.fill(0, 1);
  c.length = rowNumber + 1;
  l = 2;
  viz[i] = 1;
  c[1] = i;
  parcurgere(i);
  createTableArray(c, "g2", conditiiArray, 'parcurgeretabel', 'DF');
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

  rowData = tableData.length;
  for (var i = 1; i < rowData; i++) {
    if (tableData[i] == undefined) {
      continue;
    }
    var row = document.createElement('tr');
    row.setAttribute("id", "arow" + i);
    var cell = document.createElement('td');
    cell.setAttribute("id", "td" + tdname + i + "-" + 1);

    cell.appendChild(document.createTextNode(tableData[i]));
    conditii(i, cell);
    row.appendChild(cell);
    table.appendChild(row);
  }

  div.appendChild(table);
  document.getElementById(g).appendChild(div);
}
function conditiiArray(index, cell) {
  if (index == 1) {
    cell.className = "row";
  } else {
    cell.classList.add('parcurgereButton');
    cell.setAttribute("onClick", 'parcurgereButton(' + cell.innerText + ')');
  }
  cell.classList.add('cellArray');
}
