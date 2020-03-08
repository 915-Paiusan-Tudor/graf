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
updateAll();
makeCanvas();
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
  updateAll();
  makeCanvas();
}
function checkButtons() {
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
