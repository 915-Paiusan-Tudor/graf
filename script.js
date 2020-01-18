var a=[
  ["",1, 2, 3, 4, 5, 6, 7, 8], //0
  [1,"", 0, 0, 0, 0, 0, 0, 0], //1
  [2, 0,"", 0, 0, 0, 0, 0, 0], //2
  [3, 0, 0,"", 0, 0, 0, 0, 0], //3
  [4, 0, 0, 0,"", 0, 0, 0, 0], //4
  [5, 0, 0, 0, 0,"", 0, 0, 0], //5
  [6, 0, 0, 0, 0, 0,"", 0, 0], //6
  [7, 0, 0, 0, 0, 0, 0,"", 0], //7
  [8, 0, 0, 0, 0, 0, 0, 0,""], //8
]//0  1  2  3  4  5  6  7  8
;
function generare(){
  for (var i = 1; i < a.length; i++) {
    for(var j = i+1; j< a.length; j++){
        a[i][j]=Math.round(Math.random());
        a[j][i]=a[i][j];
  }
  }
}
generare();
console.log(a);


function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData,index) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData,index2) {
      var cell = document.createElement('td');
      if(index==0){
          cell.className = "row";
            }
      if(index2==0){
          cell.className = "collumn";
            }
      if(cellData=="0") {
      cell.className = "zero";
      }
      if ((cellData=="1") && (cell.className!="collumn") && (cell.className!="row")) {
      cell.className = "one";
      }
      if(cellData===""){
      cell.className = "diag";
            }
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}
createTable(a);
