var matriceA = [
  ["", 1, 2, 3, 4, 5],
  [1, "", 0, 0, 0, 0],
  [2, 0, "", 0, 0, 0],
  [3, 0, 0, "", 0, 0],
  [4, 0, 0, 0, "", 0],
  [5, 0, 0, 0, 0, ""]
];
var text;
var openInput = 0;
var btnNumber = 0;
var rowNumber = 5;
var tabelAdiacenta;
var current = 1;
var currentparcurgere = 'BF';
var dragging = false;
var mouseDownXY;
var mouseUpXY;
var container = document.getElementById("canvasContainer");
var c2 = document.getElementById("canvas2");
var ctx2 = c2.getContext("2d");
var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");
var cx = [];
var cy = [];
let cdepth = [
  []
];
var currentCircle;
var mouseMovePos;
var smaller;
var closestC;
var oriented = false;
var currentArrangement = "tree";
var s1;
var s2;
var x;
var y;
var currentMatrice = 'matriceA';
var isDirected = false;
let hoverNode;
let uNodes=[];
var ux;
let matriceI;
let matriceD;
let mainColor="#DC9E38";//#D19738 #91AA9D//#FFD27F
let otherMain="#B27A0C";//#B27A0C #8CBEB2 #8ACB88
let nodeStrokeColor="#191C21";//#1D262B #191C21
let nodeColor="#111111";//#161D21 #16181d
let contrastText="#1b1722";//#1b1722 #CBBF9F
let isAnimating=false;
let frame=0;
let target;
