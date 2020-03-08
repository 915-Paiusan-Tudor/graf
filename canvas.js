function makeCanvas() {
  c2.width = container.offsetWidth;
  c2.height = container.offsetHeight;
  c.width = container.offsetWidth;
  c.height = container.offsetHeight;

  x = c.width;
  y = c.height;


  if (x < y) {
    smaller = x;
  } else {
    smaller = y;
  }
  if (currentArrangement == 'tree') {
    arrangeTree();
  } else {
    arrangeCircle();
  }
  drawCanvasLines();
  // if (isAnimating && currentArrangement == 'circle') {
  //   window.requestAnimationFrame(makeCanvas);
  // }https://stackoverflow.com/questions/33622680/javascript-canvas-animated-arc
}
function arrangeTree() {
  parcurgereBF(current);
  cx = [];
  cy = [];
  ctx.strokeStyle = nodeStrokeColor;
  ctx2.strokeStyle = nodeStrokeColor;
  ctx.lineWidth = 3;
  for (var i = 1; i < cdepth.length; i++) {
    for (var j = 0; j <= cdepth[i].length; j++) {
      cx[cdepth[i][j]] = (j) * x / (cdepth[i].length)+x / (cdepth[i].length)/2;
      cy[cdepth[i][j]] = (i-1) * y / (cdepth.length-1) + y / (cdepth.length)/2;
    }
  }
  ctx.closePath();
  drawNodes();
}
function arrangeCircle() {
  var x2 = 1.5 * Math.PI- (current - 1) * 2 * Math.PI / rowNumber;
  var y2 = x2 + 2 * Math.PI / rowNumber;
  var radius = 0.8;
  cx = [];
  cy = [];
  ctx.strokeStyle = nodeStrokeColor;
  ctx2.strokeStyle = nodeStrokeColor;
  ctx.lineWidth = 5;
  for (var i = 1; i <= rowNumber; i++) {
    cx[i] = x / 2 - smaller / 2 * radius * Math.cos(x2);
    cy[i] = y / 2 + smaller / 2 * radius * Math.sin(x2);
    ctx.arc(x / 2, y / 2, smaller / 2 * radius, x2, y2, false);
    x2 = y2;
    y2 = x2 + 2 * Math.PI / rowNumber;
  }
  ctx.closePath();
  drawNodes();
  // if (isAnimating && frame<target) {
  //   frame=frame+frame;
  //   console.log(frame);
  //   window.requestAnimationFrame(makeCanvas);
  // }
  // else {
  //   isAnimating=false;
  //   //frame=0;
  // }
}
function drawNodes() {
  ctx.clearRect(0, 0, c.width, c.height);
  for (var i = 1; i <= rowNumber; i++) {
    ctx.beginPath();
    if (i==hoverNode) {
    ctx.arc(cx[i], cy[i], smaller / 2 * 0.105, 0, Math.PI * 2, false);
    }
    else {
    ctx.arc(cx[i], cy[i], smaller / 2 * 0.10, 0, Math.PI * 2, false);
    }
    ctx.fillStyle = nodeColor;
    ctx.fill();
    ctx.shadowColor = nodeColor;
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.stroke();
    ctx.fillStyle = mainColor;
    ctx.textAlign = "center";
    ctx.font = "bold " + smaller / 2 * 0.1 + "px consolas";
    ctx.fontWeight = "bold";
    ctx.textBaseline = "middle";
    ctx.fillText(i, cx[i], cy[i] + 2, );
  }
}
function drawCanvasLines() {
  ux = 1;
  ctx2.lineWidth = 3;
  uNodes=[];
  if (isDirected) {
      ctx2.clearRect(0, 0, c.width, c.height);
    for (var i = 1; i <= rowNumber; i++) {
      for (var j = 1; j <= rowNumber; j++) {

        if (j==hoverNode&&i!=hoverNode&&matriceA[i][j]!=matriceA[j][i]) {
          ctx2.strokeStyle = otherMain;
          ctx2.globalCompositeOperation = 'source-over';
        }
        else if (i==hoverNode) {
          ctx2.strokeStyle = mainColor;
          ctx2.globalCompositeOperation = 'source-over';
        }
        else {
          ctx2.strokeStyle = "#171E22";
          ctx2.globalCompositeOperation = 'destination-over';
        }
        if (matriceA[i][j] == 1 && j != i) {
          if (matriceA[j][i] == 1) {
              ctx2.beginPath();
            ctx2.moveTo(cx[i], cy[i]);
            ctx2.lineTo(cx[j], cy[j]);
            ctx2.stroke();
            ctx2.closePath();
          } else {
            canvas_arrow(ctx2, cx[i], cy[i], cx[j], cy[j]);
          }
          // TODO: add conditions

        }
      }
    }
    for (var i = 1; i <= rowNumber; i++) {
      for (var j = 1; j <= rowNumber; j++) {
        if (matriceA[i][j] == 1) {
          if (i==hoverNode||j===hoverNode) {
            ctx2.fillStyle = contrastText;
          }
          else {
            ctx2.fillStyle = mainColor;
          }
          ctx2.globalCompositeOperation='source-over';
          ctx2.textAlign = "center";
          ctx2.font = "bold " + smaller / 2 * 0.08 + "px consolas";
          ctx2.textBaseline = "middle";
          ctx2.fillText('u'+ux, (cx[i]+(cx[i]+cx[j])/2)/2, (cy[i]+(cy[i]+cy[j])/2)/2 ,);
          ux++;
          uNodes.push([i,j]);
        }
      }
    }
  } else {
      ctx2.clearRect(0, 0, c.width, c.height);
    for (var i = 1; i < rowNumber; i++) {
      for (var j = i + 1; j <= rowNumber; j++) {
        if (matriceA[i][j] == 1) {
            ctx2.beginPath();
          if(i==hoverNode||j==hoverNode){
            ctx2.globalCompositeOperation = 'source-over';
            ctx2.strokeStyle = mainColor;
          }
          else {
            ctx2.globalCompositeOperation = 'destination-over';
            ctx2.strokeStyle = "#171E22";
          }
          ctx2.moveTo(cx[i], cy[i]);
          ctx2.lineTo(cx[j], cy[j]);
          ctx2.stroke();
          ctx2.closePath();
          //ctx2.globalCompositeOperation='destination-over';
          //ctx2.fillText('ux'+ux, (cx[i]+cx[j])/2, (cy[i]+cy[j])/2 ,);
          //ux++;
        }
      }
    }
  }
}
function canvasClick(evt) {

  var mousePos = getMousePos(c, evt);
  if (currentCircle == undefined && ifInCircle(evt) && dragging == false) {
    currentCircle = ifInCircle(evt);
  } else if (currentCircle != undefined && dragging == false) {
    ctx2.beginPath();
    ctx2.lineWidth = 2;
    ctx2.moveTo(cx[currentCircle], cy[currentCircle]);
    ctx2.lineTo(cx[closestC], cy[closestC]);
    ctx2.stroke();
    if (isDirected) {
      if (matriceA[currentCircle][closestC] == 0) {
        matriceA[currentCircle][closestC] = 1;
      } else {
        matriceA[currentCircle][closestC] = 0;
      }
    } else {
      if (matriceA[currentCircle][closestC] == 0) {
        matriceA[currentCircle][closestC] = 1;
        matriceA[closestC][currentCircle] = 1;
      } else {
        matriceA[currentCircle][closestC] = 0;
        matriceA[closestC][currentCircle] = 0;
      }
    }
    if (currentArrangement == 'tree') {
      arrangeTree();
    }
    updateAll();
    currentCircle = undefined;
  }
}
function getMousePos(canvas, evt) {
  var rect = c.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function mouseDown(evt) {
  mouseDownXY = getMousePos(c, evt);
  mouseUpXY = undefined;
}

function mouseUp(evt) {
  mouseUpXY = getMousePos(c, evt);
  if (dragging) {
    dragging = false;
    currentCircle = undefined;
  }
}

function ifInCircle(evt) {
  var mousePos = getMousePos(c, evt);
  for (var i = 1; i <= rowNumber; i++) {
    if ((Math.pow((mousePos.x - cx[i]), 2) + Math.pow((mousePos.y - cy[i]), 2)) <= Math.pow((smaller / 2 * 0.1), 2)) {
      return i;
    }
  }
  currentCircle=undefined;
  drawCanvasLines();
}

function canvasHover(evt) {
  mouseMovePos = getMousePos(c, evt);
  if(!currentCircle){
      hoverNode=ifInCircle(evt);
      drawNodes();
  }
  if (mouseDownXY && !mouseUpXY && !currentCircle) {
    if (Math.abs(mouseMovePos.x - mouseDownXY.x) > 5 || Math.abs(mouseMovePos.y - mouseDownXY.y) > 5) {
      currentCircle = ifInCircle(evt);
      dragging = true;
      mouseDownXY = undefined;
    }
  } else if (currentCircle != undefined && dragging == false) {
    closestC = closestCircle(evt, mouseMovePos);
    drawLines();
    hoverNode=undefined;
  }
  if (dragging) {
    cx[currentCircle] = mouseMovePos.x;
    cy[currentCircle] = mouseMovePos.y;
    drawNodes();
    drawCanvasLines();
  }
  if (hoverNode&&!currentCircle) {
    drawCanvasLines();
  }
}

function closestCircle(evt, mouseMovePos) {
  var min = Number.MAX_SAFE_INTEGER;
  var k;
  for (var i = 1; i <= rowNumber; i++) {
    if (i != currentCircle && min > Math.sqrt(Math.pow((mouseMovePos.y - cy[i]), 2) + Math.pow((mouseMovePos.x - cx[i]), 2))) {
      k = i;
      min = Math.sqrt(Math.pow((mouseMovePos.y - cy[i]), 2) + Math.pow((mouseMovePos.x - cx[i]), 2));
    }
  }
  return k;
}

function drawLines() {
  ctx2.clearRect(0, 0, c.width, c.height);
  drawCanvasLines();
  if (matriceA[currentCircle][closestC] == 0) {
    ctx2.globalCompositeOperation = 'source-over';
    ctx2.strokeStyle = nodeStrokeColor;
    ctx2.lineWidth = 3;
  } else {
    ctx2.globalCompositeOperation = 'source-over';
    //ctx2.globalCompositeOperation='destination-over';
    ctx2.strokeStyle = "#343c40";
    ctx2.lineWidth = 3.5;
  }
  ctx2.beginPath();
  ctx2.moveTo(cx[currentCircle], cy[currentCircle]);
  if (isDirected) {
    canvas_arrow(ctx2, cx[currentCircle], cy[currentCircle], cx[closestC], cy[closestC]);
  } else {
    ctx2.lineTo(cx[closestC], cy[closestC]);
  }
  ctx2.stroke();

  //ctx2.globalCompositeOperation='destination-over';
}
function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 15; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  var fthx = ((fromx + (tox + fromx) / 2) / 2 + (tox + fromx) / 2) / 2;
  var fthy = ((fromy + (toy + fromy) / 2) / 2 + (toy + fromy) / 2) / 2;
  //ctx2.globalCompositeOperation = 'destination-over';
  ctx2.beginPath();
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.stroke();
  ctx2.closePath();
  ctx2.beginPath();
  context.lineCap="round";
  //ctx2.globalCompositeOperation = 'source-over';
  context.moveTo(fthx, fthy);
  context.lineTo(fthx - headlen * Math.cos(angle - Math.PI / 6), fthy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(fthx, fthy);
  context.lineTo(fthx - headlen * Math.cos(angle + Math.PI / 6), fthy - headlen * Math.sin(angle + Math.PI / 6));
  context.stroke();
  ctx2.closePath();
}
