
  var matriceA =[["",1,2,3,4,5],[1,"",0,0,0,0],[2,0,"",0,0,0],[3,0,0,"",0,0],[4,0,0,0,"",0],[5,0,0,0,0,""]];
  var text;
  var openInput=0;
  var btnNumber = 0;
  var rowNumber = 5;
  var tabelAdiacenta;
  var current=1;
  var currentparcurgere='BF';
  var dragging=false;
  var mouseDownXY;
  var mouseUpXY;
  var container=document.getElementById("canvasContainer");
  var c2=document.getElementById("canvas2");
  var ctx2 = c2.getContext("2d");
  var c=document.getElementById("canvas1");
  var ctx = c.getContext("2d");
  var cx=[];
  var cy=[];
  let cdepth=[[]];
  var currentCircle;
  var mouseMovePos;
  var smaller;
  var closestC;
  var currentArrangement="tree";
  var s1;
  var s2;
  var x;
  var y;
  ///////////////////////////////////////////////////////////////////////////////
  function createTable(tableData, g, conditii, classnametabel, tdname,rowname) {
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
      row.className=rowname;
      rowData.forEach(function(cellData, index2) {
        var cell = document.createElement('td');
        cell.setAttribute("id", tdname+(index2+1));
        cell.className=tdname;
        conditii(index, index2, cellData, cell);
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
      table.appendChild(row);
      div.appendChild(table);
    });
    document.getElementById(g).insertBefore(div, document.getElementById(g).childNodes[0]);
    if (classnametabel=="tableLeft") {
      var trow=document.createElement('tr');
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
      cell.classList.add("zero","matriceButtonZero");
      cell.setAttribute("onClick",'matriceToggle('+index+','+index2+')');
    }
    if (cellData == "1"&& !(cell.classList.contains("row")||cell.classList.contains("collumn"))) {
      cell.classList.add("one","matriceButtonOne");
      cell.setAttribute("onClick",'matriceToggle('+index+','+index2+')');
    }
    else if (cellData === "") {
      cell.className = "diag";
    }

  }
  createTable(matriceA, "g3", conditiimatrice, 'matrice','matrice',"matrice");

  ///////////////////////////////////////////////////////////////////////////////
  randomMatriceA();
  function matriceToggle(x,y){
    if(matriceA[x][y]==0){
    matriceA[x][y]=1;
    matriceA[y][x]=1;
  }
    else {
      matriceA[x][y]=0;
      matriceA[y][x]=0;
    }
    updateAll();
  }
  function updateTableLeft(){
tableLeft=[[]];
    for(var i=1;i<=rowNumber;i++)
    {
      tableLeft.push([i]);
    }
    for(var i=1;i<=rowNumber;i++)
    {
      for(var j=i;j<=rowNumber;j++){
        if(matriceA[i][j]==1){
          tableLeft[i].push(j);
          tableLeft[j].push(i);
        }
      }
    }
    createTable(tableLeft, "table",empty, 'tableLeft','td',"tr");

  }
  updateTableLeft();
  function empty(){}
  function conditionsTableLeft(){

  }
  {

  }
  ///////////////////////////////////////////////////////////////////////////////

  function addRow() {
    if (openInput != 0) {
      alert("Please enter a node");
      return;
    }
    rowNumber++;
    matriceA[0].push(rowNumber);
    matriceA.push([0]);
    for(var i=1;i<=rowNumber;i++){
      for(var j=1;j<=rowNumber;j++){
        if(matriceA[i].length!=rowNumber+1){
          matriceA[i].push(0);
        }
      }
      matriceA[i][0]=i;
      matriceA[i][i]="";
    }

    updateTableLeft();

    updateButtons();

    createTable(matriceA, "g3", conditiimatrice, 'matrice','');
    generareTabelAdiacenta();
    makeCanvas();
  }

  function updateButtons(){
    if (btnNumber<rowNumber) {
      for(btnNumber;btnNumber<rowNumber;btnNumber++){
          createleftbuttons(btnNumber+1);
      }
    }
    else if (btnNumber>rowNumber) {
      document.getElementById("btndiv" + btnNumber).remove();
      btnNumber--;
    }
        checkButtons();

        s2 = document.getElementById('tableLeftdiv');


        function select_scroll_2(e) { s1.scrollTop = s2.scrollTop; }
        s2.addEventListener('scroll', select_scroll_2, false);
  }
  function select_scroll_1(e) { s2.scrollTop = s1.scrollTop; }
  s1 = document.getElementById('allbtndiv');
    s1.addEventListener('scroll', select_scroll_1, false);
  updateButtons();
  ///////////////////////////////////////////////////////////////////////////////
  function createleftbuttons(x) {
    var allbtndiv = document.getElementById('allbtndiv');
    var btndiv = document.createElement('div'); //BUTOANE
    btndiv.className = "btndiv";
    btndiv.setAttribute("id", "btndiv" + (x));
    var button = document.createElement("button");
    button.setAttribute("onclick", "addCell(" + (x) + ")");
    button.setAttribute("id", "add" + (x));
    button.className = "btnadd";
    button.innerHTML="<p>+</p>";
    btndiv.appendChild(button);
    var button = document.createElement("button");
    button.setAttribute("onclick", "deleteCell(" + (x) + ")");
    button.setAttribute("id", "remove" + (x));
    button.setAttribute("disabled", "");
    button.className = "btnremove";
    button.innerHTML="<p>-</p>";
    btndiv.appendChild(button);
    allbtndiv.insertBefore(btndiv, allbtndiv.childNodes[-1]);
  }
  ///////////////////////////////////////////////////////////////////////////////
  function addCell(x, y) {
    if (openInput == x) {
      alert("Please enter a node");
      return;
    }
    openInput=x;
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
  ///////////////////////////////////////////////////////////////////////////////
  function deleteRow() {
    if (openInput != 0) {
      alert("Please enter a node");
      return;
    }
    rowNumber--;
    tableLeft.pop();
    matriceA.pop();
    for(var i=0;i<=rowNumber;i++){
      matriceA[i].pop();
    }
    updateTableLeft();
    updateButtons();
    checkButtons();
    generareTabelAdiacenta();
    createTable(matriceA, "g3", conditiimatrice, 'matrice','');
    eval("parcurgere"+currentparcurgere)(current);
    makeCanvas();
  }
  ///////////////////////////////////////////////////////////////////////////////
  function checkButtons(){
    for(var i=1;i<tableLeft.length;i++){
      if(tableLeft[i].length==rowNumber && !document.getElementById("add"+i).hasAttribute("disabled")){
        document.getElementById("add" + i).setAttribute("disabled", "");
      }
      else if (tableLeft[i].length!=rowNumber && document.getElementById("add"+i).hasAttribute("disabled")) {
        document.getElementById("add" + i).attributes.removeNamedItem("disabled");
      }
      else if (tableLeft[i].length==1 && !document.getElementById("remove"+i).hasAttribute("disabled")) {
        document.getElementById("remove" + i).setAttribute("disabled", "");
      }
      else if (tableLeft[i].length!==1 &&document.getElementById("remove"+i).hasAttribute("disabled")) {
        document.getElementById("remove" + i).attributes.removeNamedItem("disabled");

      }
    }
    if(rowNumber==3 && !document.getElementById("removetop").hasAttribute("disabled")){
        document.getElementById("removetop").setAttribute("disabled", "");
    }
    else if (rowNumber!=3 && document.getElementById("removetop").hasAttribute("disabled")) {
        document.getElementById("removetop").attributes.removeNamedItem("disabled");
    }
    else if (rowNumber==8 && !document.getElementById("addtop").hasAttribute("disabled")) {
        document.getElementById("addtop").setAttribute("disabled", "");
    }
    else if (rowNumber!=8 && document.getElementById("addtop").hasAttribute("disabled")) {
        document.getElementById("addtop").attributes.removeNamedItem("disabled");
    }
  }
  ///////////////////////////////////////////////////////////////////////////////
  function deleteCell(x) {
    if (openInput == x) {
      openInput=0;
    }
    else if (openInput !=0) {
      alert("Please enter a node");
      return;
    }
    var row = document.getElementById("tr" + x);
    var y = parseInt(row.lastChild.innerText);
    if (y) {
      matriceA[x][y]=0;
      matriceA[y][x]=0;
    }

    updateTableLeft();
    checkButtons();
    generareTabelAdiacenta();
    eval("parcurgere"+currentparcurgere)(current);
  }
  ///////////////////////////////////////////////////////////////////////////////
  function change(rownum, cellnum) {
    var cell = document.getElementById(rownum + '-' + cellnum);
    var ok=1;
    if (cell.firstChild.value <= 0 || cell.firstChild.value == rownum || cell.firstChild.value > rowNumber || isNaN(parseInt(cell.firstChild.value))) {
      cell.firstChild.value = "";
      cell.firstChild.focus();
      ok=0;
    }
      for(var j = 1; j< tableLeft[rownum].length;j++){
      if (document.getElementById("tr" + rownum).childNodes[j].innerText == cell.firstChild.value) {
        cell.firstChild.value = "";
        cell.firstChild.focus();
        ok=0;
      }
      }

    if (ok) {
      openInput=0;
      text = parseInt(cell.firstChild.value);
      cell.firstChild.blur();
      matriceA[text][rownum]=1;
      matriceA[rownum][text]=1;
      updateTableLeft();
      checkButtons();
    }
    generareTabelAdiacenta();
    eval("parcurgere"+currentparcurgere)(current);
  }
  ///////////////////////////////////////////////////////////////////////////////continue
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
      tabelAdiacenta[1].push(i+1);
    }
    var k = rowNumber;
    for (var i = 0; i < rowNumber; i++) {
      if (tableLeft[i+1].length > 1) {
        tabelAdiacenta[2][i] = k + 1;
      } else {
        tabelAdiacenta[2][i] = 0;
      }
      for (var j = 1; j < tableLeft[i+1].length; j++) {
        tabelAdiacenta[1].push(parseInt(document.getElementById("tr" + (i+1)).childNodes[j].innerText));
        if (j != tableLeft[i+1].length - 1) {
          tabelAdiacenta[2][k] = k + 2;
        } else {
          tabelAdiacenta[2][k] = 0;
        }
        k++;
      }

    }
    for (var i = 0; i < k; i++) {
      tabelAdiacenta[0][i] = i+1;
    }
    createTable(tabelAdiacenta, "g5", conditiiTabel, 'tabelAdiacenta','adiacenta','adiacenta');
  }
  generareTabelAdiacenta();

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
  if(main=="canvasContainer"){
    var mq = window.matchMedia('@media all and (max-width: 600px)');
      if(mq.matches) {
        console.log("asda");
          document.getElementById("g1").style.gridTemplateColumn=1;
      }
  }
  drawNodes();
}
function parcurgereBF(i){
  var viz=[];
  var c=[];
  let currentDepth=1;
  let includes;
  cdepth=[];
  viz.length=rowNumber+1;
  viz.fill(0,1);
  c.length=rowNumber+1;
  var p=1;
  var u=1;
  c[1]=i;
  cdepth[currentDepth]=[i];
  viz[i]=1;
  while (p<=u) {
    var x=c[p];
    if(cdepth[currentDepth].includes(x)){
      currentDepth++;
      cdepth.push([]);
    }
    for(var j=1; j<=rowNumber; j++)
    {
      if(matriceA[x][j]==1 && viz[j]==0){

        viz[j]=1;
        u++;
        c[u]=j;
        cdepth[currentDepth].push(j);
      }
    }
    p++;
  }
  for(var k=1;k<=rowNumber;k++){
    let isolated=true;
  for (var i = 1; i <cdepth.length; i++) {
    for (var j = 0; j < cdepth[i].length; j++) {
      if (cdepth[i].includes(k)) {
        isolated=false
      }
    }
  }
  if (isolated) {
    cdepth[currentDepth].push(k);
  }
}
if(cdepth[currentDepth][0]==undefined)
{
  cdepth.pop();
}
console.log(cdepth);
if (currentparcurgere=="BF") {
  createTableArray(c, "g2", conditiiArray, 'parcurgeretabel','BF',"BF");
}

}

function parcurgereDF(i){
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
function parcurgereButton(x){
  document.getElementById("current"+currentparcurgere).innerHTML=x;
  eval("parcurgere"+currentparcurgere)(x);
  current=x;
  makeCanvas();
}
function conditiiArray(index, cell) {
  if (index == 1) {
    cell.className = "row";
  }
  else {
    cell.classList.add('parcurgereButton');
    cell.setAttribute("onClick",'parcurgereButton('+cell.innerText+')');
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

      cell.appendChild(document.createTextNode(tableData[i]));
      conditii(i , cell);
      row.appendChild(cell);
      table.appendChild(row);
    }

    div.appendChild(table);
  document.getElementById(g).appendChild(div);
}
function increment(x, i){
  if(current!=rowNumber && i!=-1){
    current+=i;;
  }
  else if (i!=-1) {
    current=1;
  }
  if(current!=1 && i!=1){
    current+=i;
  }
  else if (i!=1) {
    current=rowNumber;
  }
  document.getElementById("current"+x).innerHTML=current;
  eval("parcurgere"+x)(current);

  makeCanvas();
}

document.getElementById("defaultOpen").click();
document.getElementById("defaultOpen2").click();


function makeCanvas(){
  c2.width=container.offsetWidth;
  c2.height=container.offsetHeight;
  c.width=container.offsetWidth;
  c.height=container.offsetHeight;

x=c.width;
y=c.height;


if (x<y) {
  smaller=x;
}
else {
  smaller=y;
}
if (currentArrangement=='tree') {
arrangeTree();
}
else {
  arrangeCircle();
}

drawCanvasLines();
}
function arrangeTree(){
  parcurgereBF(current);
  cx=[];
  cy=[];
    ctx.strokeStyle = "#1D262B";
    ctx2.strokeStyle = "#1D262B";
    ctx.lineWidth = 3;
  for (var i = 1; i <cdepth.length; i++) {
    for (var j = 0; j <= cdepth[i].length; j++) {
      cx[cdepth[i][j]] = (j+1)*x/(cdepth[i].length+1);
      cy[cdepth[i][j]] = i*y / (cdepth.length);
    }
  }
  ctx.closePath();
  drawNodes();
}
function arrangeCircle(){
  var x2=1.5*Math.PI-(current-1)*2*Math.PI/rowNumber;
  var y2=x2 + 2*Math.PI/rowNumber;
  var radius=0.8;
  cx=[];
  cy=[];
    ctx.strokeStyle = "#1D262B";
    ctx2.strokeStyle = "#1D262B";
    ctx.lineWidth = 5;
  for (var i = 1; i <=rowNumber; i++) {
    cx[i] = x/2 - smaller/2*radius*Math.cos(x2);
    cy[i] = y/2 + smaller/2*radius*Math.sin(x2);
    ctx.arc(x/2, y/2, smaller/2*radius, x2,y2,false);
    x2=y2;
    y2=x2 + 2*Math.PI/rowNumber;
  }
  ctx.closePath();
      drawNodes();
}
function drawNodes(){
  ctx.clearRect(0,0,c.width,c.height);
  for (var i = 1; i <=rowNumber; i++){
  ctx.beginPath();
  ctx.arc(cx[i], cy[i], smaller/2*0.10, 0,Math.PI*2,false);
    ctx.fillStyle = "#161D21";

      ctx.fill();
      ctx.shadowColor = '#161D21';
      ctx.shadowBlur = 2;
   ctx.shadowOffsetX = 2;
   ctx.shadowOffsetY = 2;
      ctx.stroke();
    ctx.fillStyle = "#D19738";
    ctx.textAlign = "center";
    ctx.font = "bold "+smaller/2*0.1+"px consolas";
    ctx.fontWeight = "bold";
    ctx.textBaseline = "middle";
    ctx.fillText(i, cx[i], cy[i]+2 ,);
  }
}

function drawCanvasLines(){
  ctx2.clearRect(0,0,c.width,c.height);
  ctx2.beginPath();
      ctx2.lineWidth = 5;
      ctx2.strokeStyle = "#1D262B";
      for (var i = 1; i < rowNumber; i++){
        for (var j = i+1; j <= rowNumber; j++) {
          if (matriceA[i][j]==1) {
            ctx2.moveTo(cx[i],cy[i]);
            ctx2.lineTo(cx[j],cy[j]);
          }
        }
      }
  ctx2.stroke();
  ctx2.closePath();
}
function canvasClick(evt) {

  var mousePos = getMousePos(c, evt);
  if (currentCircle==undefined && ifInCircle(evt) && dragging==false){
      currentCircle=ifInCircle(evt);
  }
  else if(currentCircle!=undefined && dragging==false){
    ctx2.beginPath();
    ctx2.lineWidth = 2;
    ctx2.moveTo(cx[currentCircle],cy[currentCircle]);
    ctx2.lineTo(cx[closestC],cy[closestC]);
    ctx2.stroke();
    if (matriceA[currentCircle][closestC]==0) {
      matriceA[currentCircle][closestC]=1;
      matriceA[closestC][currentCircle]=1;
    }
    else {
      matriceA[currentCircle][closestC]=0;
      matriceA[closestC][currentCircle]=0;
      drawNodes();
    }
    drawCanvasLines();
    createTable(matriceA, "g3", conditiimatrice, 'matrice','');
    updateTableLeft();
    updateButtons();
    checkButtons();
    generareTabelAdiacenta();
    eval("parcurgere"+currentparcurgere)(current);
    currentCircle=undefined;
  }
}

function getMousePos(canvas, evt) {
  var rect = c.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function mouseDown(evt){
  mouseDownXY=getMousePos(c,evt);
  mouseUpXY=undefined;
}
function mouseUp(evt){
  mouseUpXY=getMousePos(c,evt);
  if (dragging) {
    dragging=false;
    currentCircle=undefined;
  }
}
function ifInCircle(evt){
  var mousePos = getMousePos(c, evt);
  for(var i=1;i<=rowNumber;i++){

    if ( (Math.pow((mousePos.x - cx[i]),2) + Math.pow((mousePos.y - cy[i]),2)) <= Math.pow((smaller/2*0.15),2) ) {
      return i;
    }
  }
}

function canvasHover(evt) {
  mouseMovePos = getMousePos(c, evt);
  if (mouseDownXY && !mouseUpXY && !currentCircle) {
    if (Math.abs(mouseMovePos.x-mouseDownXY.x)>5 || Math.abs(mouseMovePos.y-mouseDownXY.y)>5) {
      currentCircle=ifInCircle(evt);
      dragging=true;
      mouseDownXY=undefined;
    }
  }
  else if(currentCircle!=undefined && dragging==false){
    closestC=closestCircle(evt,mouseMovePos);
      drawLines();
    }
    if (dragging) {
      cx[currentCircle]=mouseMovePos.x;
      cy[currentCircle]=mouseMovePos.y;
      drawNodes();

      drawCanvasLines();
    }
}

function closestCircle(evt, mouseMovePos){
  var min=Number.MAX_SAFE_INTEGER;
  var k;
  for(var i=1;i<=rowNumber;i++){
    if(i!=currentCircle && min>Math.sqrt( Math.pow((mouseMovePos.y - cy[i]),2) + Math.pow((mouseMovePos.x - cx[i]),2 ))) {
      k=i;
      min=Math.sqrt( Math.pow((mouseMovePos.y - cy[i]),2) + Math.pow((mouseMovePos.x - cx[i]),2 ));
    }
  }
  return k;
}

function drawLines() {
  ctx2.clearRect(0,0,c.width,c.height);
  drawCanvasLines();
  if (matriceA[currentCircle][closestC]==0) {
    ctx2.strokeStyle = "#1D262B";
    ctx2.lineWidth = 2;
  }
  else {
    ctx2.globalCompositeOperation='source-over';
    ctx2.strokeStyle = "#343c40";
    ctx2.lineWidth = 5;
  }
   ctx2.beginPath();
   ctx2.moveTo(cx[currentCircle],cy[currentCircle]);
   ctx2.lineTo(cx[closestC],cy[closestC]);
   ctx2.stroke();

  ctx2.globalCompositeOperation='destination-over';
}
function updateAll(){
  createTable(matriceA, "g3", conditiimatrice, 'matrice','');
  updateTableLeft();
  updateButtons();
  checkButtons();
  generareTabelAdiacenta();
  eval("parcurgere"+currentparcurgere)(current);
  if (currentArrangement=='tree') {
  arrangeTree();
  }
  else {
    arrangeCircle();
  }
  drawNodes();
  drawCanvasLines();
}
function clearMatriceA(){
  for(var i=1;i<rowNumber;i++){
    for (var j = i+1; j <= rowNumber; j++) {
      matriceA[i][j]=0;
      matriceA[j][i]=0;
    }
  }
  updateAll();
}
function randomMatriceA(){
  for(var i=1;i<rowNumber;i++){
    for (var j = i+1; j <= rowNumber; j++) {
      matriceA[i][j]=Math.round(Math.random());
      matriceA[j][i]=matriceA[i][j];
    }
  }
  updateAll();
}
function completeMatriceA(){
  for(var i=1;i<rowNumber;i++){
    for (var j = i+1; j <= rowNumber; j++) {
      matriceA[i][j]=1;
      matriceA[j][i]=1;
    }
  }
  updateAll();
}
c.addEventListener("mousedown",mouseDown);
c.addEventListener('mouseup',canvasClick, false);
c.addEventListener("mouseup",mouseUp);
c.addEventListener('mousemove',canvasHover);

makeCanvas();
window.onresize=makeCanvas;
window.onzoom=makeCanvas;
function navbarhover(hover){
  if (hover) {
    document.getElementsByClassName("grid")[0].style.marginLeft="10%";
    document.getElementsByClassName("grid")[0].style.marginRight="-5%";
    //document.getElementsByClassName("grid")[0].style.justifyContent="flex-end";
  }
  else {
    document.getElementsByClassName("grid")[0].style.marginLeft="0";
    document.getElementsByClassName("grid")[0].style.marginRight="0";
    //document.getElementsByClassName("grid")[0].style.justifyContent="center";
  }
}
document.getElementById('treeLayout').click();
function changeLayout(button,layout){
  currentArrangement=layout;
  updateAll();
  if (button==document.getElementById('circleLayout')) {
    button.classList.add("selectedLayout");
    document.getElementById('treeLayout').classList.remove("selectedLayout");
  }
  else {
    button.classList.add("selectedLayout");
    document.getElementById('circleLayout').classList.remove("selectedLayout");
  }
}
