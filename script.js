function matriceToggle(x, y) {
  if (matriceA[x][y] == 0) {
    matriceA[x][y] = 1;
    if (!isDirected) {
      matriceA[y][x] = 1;
    }
  } else {
    matriceA[x][y] = 0;
    if (!isDirected) {
      matriceA[y][x] = 0;
    }
  }
  updateAll();
}

function select_scroll_1(e) {
  s2.scrollTop = s1.scrollTop;
}

function openParcurgere(evt, parcurgere) {
  currentparcurgere = parcurgere;
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
  eval("parcurgere" + currentparcurgere)(current);
  document.getElementById("current" + currentparcurgere).innerHTML = current;
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
  if (main == "canvasContainer") {
    makeCanvas();
    var mq = window.matchMedia('@media all and (max-width: 600px)');
    if (mq.matches) {
      document.getElementById("g1").style.gridTemplateColumn = 1;
    }
  }
  drawNodes();
}

function parcurgereButton(x) {
  document.getElementById("current" + currentparcurgere).innerHTML = x;
  eval("parcurgere" + currentparcurgere)(x);
  current = x;
  makeCanvas();
}

function increment(x, i) {
  if (current != rowNumber && i != -1) {
    current += i;;
  } else if (i != -1) {
    current = 1;
  }
  if (current != 1 && i != 1) {
    current += i;
  } else if (i != 1) {
    current = rowNumber;
  }
  document.getElementById("current" + x).innerHTML = current;
  eval("parcurgere" + x)(current);
  // target=1.5 * Math.PI- (current) * 2 * Math.PI / rowNumber;
  // frame=target/300;
  // isAnimating=true;
  makeCanvas();
}
//// TODO: update adiacenta after switch to nondirected
function updateAll() {
  ctx2.clearRect(0, 0, c.width, c.height);
  updateTableLeft();
  checkButtons();
  generareTabelAdiacenta();
  eval("parcurgere" + currentparcurgere)(current);
  drawNodes();
  drawCanvasLines();
  createMatriceIncidenta();
  createMatriceDrum();
  console.table(matriceI);
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

function clearMatriceA() {
  for (var i = 1; i < rowNumber; i++) {
    for (var j = i + 1; j <= rowNumber; j++) {
      matriceA[i][j] = 0;
      matriceA[j][i] = 0;
    }
  }
  if (currentArrangement == 'tree') {
    arrangeTree();
  }
  updateAll();
}

function randomMatriceA() {
  if (isDirected) {
    for (var i = 1; i <= rowNumber; i++) {
      for (var j = 1; j <= rowNumber; j++) {
        if (j != i) {
          matriceA[i][j] = Math.round(Math.random());
        }
      }
    }
  } else {
    for (var i = 1; i < rowNumber; i++) {
      for (var j = i + 1; j <= rowNumber; j++) {
        matriceA[i][j] = Math.round(Math.random());
        matriceA[j][i] = matriceA[i][j];
      }
    }
  }
  if (currentArrangement == 'tree') {
    arrangeTree();
  }
  updateAll();
}

function completeMatriceA() {
  for (var i = 1; i < rowNumber; i++) {
    for (var j = i + 1; j <= rowNumber; j++) {
      matriceA[i][j] = 1;
      matriceA[j][i] = 1;
    }
  }
  if (currentArrangement == 'tree') {
    arrangeTree();
  }
  updateAll();
}

function navbarhover(hover) {
  if (hover) {
    document.getElementsByClassName("grid")[0].style.transform = "translateX(8%)";
  } else {
    document.getElementsByClassName("grid")[0].style.transform = "translateX(0)";
  }
}

function changeLayout(button, layout) {
  currentArrangement = layout;
  if (currentArrangement == 'tree') {
    arrangeTree();
  } else {
    arrangeCircle();
  }
  updateAll();
  if (button == document.getElementById('circleLayout')) {
    button.classList.add("selectedSVG");
    document.getElementById('treeLayout').classList.remove("selectedSVG");
  } else {
    button.classList.add("selectedSVG");
    document.getElementById('circleLayout').classList.remove("selectedSVG");
  }
}

function createMatriceIncidenta(){
  matriceI=[];
  for(var i=0; i<=rowNumber;i++)
  {
    matriceI.push([]);
    for (var j = 0; j <= uNodes.length; j++) {
      if (j==0&&i==0) {
        matriceI[i].push('');
      }
      else if (j==0) {
        matriceI[i].push(i);
      }
      else if (i==0) {
        matriceI[i].push('u'+j);
      }
      else {
        matriceI[i].push(0);
      }
    }
  }
  for(var i=0; i< uNodes.length;i++){
    matriceI[uNodes[i][0]][i+1]=1;
    matriceI[uNodes[i][1]][i+1]=-1;
  }
}

function createMatriceDrum(){
  matriceD=[];
  for (var i = 0; i < matriceA.length; i++){
    matriceD[i] = matriceA[i].slice();
}
  for(var k = 1 ; k <= rowNumber ; k++){
    for(var i = 1 ; i <= rowNumber ; i++){
        for(var j = 1 ; j <= rowNumber ; j++){
            if(matriceD[i][j] == 0){
              console.log(k+"->"+i+"-"+j ,  matriceD[i][k] , matriceD[k][j]);
              if (k==i&&k==j) {
                matriceD[i][j] = 1;
              }
              else if (k===i) {
                matriceD[i][j] = matriceD[k][j];
              }
              else if (k==j) {
                matriceD[i][j] = matriceD[i][k];
              }
              else {
                matriceD[i][j] = matriceD[i][k] * matriceD[k][j];
              }
                console.log(matriceD[i][j]);
              }
            }
          }
        }
        console.table(matriceD);
}

function matriceCurrent(evt, matrice) {
  var tablinks = document.getElementsByClassName("tablinks3");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  evt.currentTarget.className += " active";
  currentMatrice = matrice;
    createMatriceIncidenta();
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

function changeDirection(button, directed) {
  isDirected = directed;
  updateAll();
  if (button == document.getElementById('nondirected')) {
    document.getElementById('drumBtn').style.display="none";
    document.getElementById('incidentaBtn').style.display="none";
    button.classList.add("selectedSVG");
    document.getElementById('directed').classList.remove("selectedSVG");
    document.getElementById("defaultOpen3").click();
  } else {
    document.getElementById('drumBtn').style.display="flex";
    document.getElementById('incidentaBtn').style.display="flex";
    button.classList.add("selectedSVG");
    document.getElementById('nondirected').classList.remove("selectedSVG");
  }
}

randomMatriceA();
updateTableLeft();
makeCanvas();
// updateButtons();
generareTabelAdiacenta();

s1 = document.getElementById('allbtndiv');
s1.addEventListener('scroll', select_scroll_1, false);
c.addEventListener("mousedown", mouseDown);
c.addEventListener('mouseup', canvasClick, false);
c.addEventListener("mouseup", mouseUp);
c.addEventListener('mousemove', canvasHover);
window.onresize = makeCanvas;
window.onzoom = makeCanvas;
document.getElementById('nondirected').click();
document.getElementById('treeLayout').click();
document.getElementById("defaultOpen").click();
document.getElementById("defaultOpen2").click();
document.getElementById("defaultOpen3").click();
let root = document.documentElement;
  //root.style.setProperty('--pagebg', "#ffffff");
  function changeTheme(theme,button){
    if(theme=="yellow"){
      root.style.setProperty('--pagebg', "#263835");
      root.style.setProperty('--bg-color', "#263238");
      root.style.setProperty('--bg-color-light', "#304047");
      root.style.setProperty('--bg-color-dark', "#1c2429");
      root.style.setProperty('--darkbg', "#171E22");
      root.style.setProperty('--darkbg-dark', "#0d1113");
      root.style.setProperty('--darkbg-light', "#212b31");
      root.style.setProperty('--main', "#DC9E38");
      root.style.setProperty('--darkermain', "#B27A0C");
      root.style.setProperty('--darkerbg', "#1E282D");
      root.style.setProperty('--darkerbg-dark', "#141a1e");
      root.style.setProperty('--oneColor', "#FB9039");
      root.style.setProperty('--zeroColor', "#C39EA0");
      mainColor='#DC9E38';
      otherMain="#B27A0C";//#B27A0C #8CBEB2 #8ACB88
      nodeStrokeColor="#1D262B";//#1D262B #191C21
      nodeColor="#161D21";//#161D21 #16181d
      contrastText="#1b1722";//#1b1722 #CBBF9F
    }
    else if(theme=="green"){
      root.style.setProperty('--pagebg', "#49605F");
      root.style.setProperty('--bg-color', "#242428");
      root.style.setProperty('--bg-color-light', "#303035");
      root.style.setProperty('--bg-color-dark', "#18181b");
      root.style.setProperty('--darkbg', "#191C21");
      root.style.setProperty('--darkbg-dark', "#0e1012");
      root.style.setProperty('--darkbg-light', "#24282f");
      root.style.setProperty('--main', "#8ACB88");
      root.style.setProperty('--darkermain', "#FFD27F");
      root.style.setProperty('--darkerbg', "#16181d");
      root.style.setProperty('--darkerbg-dark', "#0b0c0e");
      root.style.setProperty('--oneColor', "#FFBF46");
      root.style.setProperty('--zeroColor', "#E4FDE1");
      mainColor='#8ACB88';
      otherMain="#8CBEB2";//#B27A0C #8CBEB2 #8ACB88
      nodeStrokeColor="#191C21";//#1D262B #191C21
      nodeColor="#16181d";//#161D21 #16181d
      contrastText="#CBBF9F";//#1b1722 #CBBF9F
    }
    else if (theme=="blue") {
      root.style.setProperty('--pagebg', "#3E606F");
      root.style.setProperty('--bg-color', "#193441");
      root.style.setProperty('--bg-color-light', "#204353");
      root.style.setProperty('--bg-color-dark', "#12252f");
      root.style.setProperty('--darkbg', "#171E22");
      root.style.setProperty('--darkbg-dark', "#0d1113");
      root.style.setProperty('--darkbg-light', "#212b31");
      root.style.setProperty('--main', "#91AA9D");
      root.style.setProperty('--darkermain', "#8CBEB2");
      root.style.setProperty('--darkerbg', "#1E282D");
      root.style.setProperty('--darkerbg-dark', "#141a1e");
      root.style.setProperty('--oneColor', "#FCFFF5");
      root.style.setProperty('--zeroColor', "#D1DBBD");
      mainColor='#91AA9D';
      otherMain="#8ACB88";//#B27A0C #8CBEB2 #8ACB88
      nodeStrokeColor="#191C21";//#1D262B #191C21
      nodeColor="#16181d";//#161D21 #16181d
      contrastText="#CBBF9F";//#1b1722 #CBBF9F
    }
    for(var i=0; i<3;i++) {
      console.log(document.getElementsByClassName("themeContainer")[i]);
      document.getElementsByClassName("themeContainer")[i].classList.remove("selectedTheme");
    }
    button.classList.add("selectedTheme");
    drawNodes();
    drawCanvasLines();
  }
