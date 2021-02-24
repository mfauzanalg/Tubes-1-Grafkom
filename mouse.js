
// Mouse Move
var drag = false;
var x_one, x_two, y_one, y_two

// Type object
var drawMethod;
var verticesArr = [];
var isDrawing = false;
var hexVal;
var colorRGB;
var polyArr;
var sideInput;

const renderPoly = (coorX, coorY) => {
  polyArr = []
  var n = parseInt(document.getElementById('side-input').value)
  var r = parseInt(document.getElementById('size-input').value) * 0.0025
  for (i = 0; i < n; i++) {
    var x = coorX + r * Math.cos(2 * Math.PI * i / n) 
    var y = coorY + r * Math.sin(2 * Math.PI * i / n)
    polyArr.push(x)
    polyArr.push(y)
  }

  hexVal =  document.getElementById("color-input").value
  colorRGB = hexToRgbNew(hexVal.replace('#',''))
}

var mouseDown = function(e) {
  if(geoObject != ''){
    x_one = e.pageX 
    y_one = e.pageY;
    if (geoObject == "line"){
      isDrawing = !isDrawing;
    }
  }

  if (!isDrawing && geoObject == "square"){
    renderSquare()
    const shape = {
      method: drawMethod,
      vertices: verticesArr,
      rgbVal: colorRGB
    }
    allShapes.push(shape)
    renderAll()
    geoObject = ""
  }

  if (!isDrawing && geoObject == "polygon"){
    renderPoly(getCoorX(e.pageX), getCoorY(e.pageY))
    const shape = {
      method: gl.TRIANGLE_FAN,
      vertices: polyArr,
      rgbVal: colorRGB
    }
    allShapes.push(shape)
    renderAll()
    geoObject = ""
  }

  e.preventDefault();
  return false;
};

var mouseMove = function(e) {
  x_two = e.pageX
  y_two = e.pageY

  if (isDrawing && geoObject != ""){
    if (geoObject == "line"){
      drawMethod = gl.LINE_STRIP
      verticesArr = [
        getCoorX(x_one), 
        getCoorY(y_one), 
        getCoorX(x_two), 
        getCoorY(y_two),
      ]
    }
    renderAll()
    hexVal =  document.getElementById("color-input").value
    colorRGB = hexToRgbNew(hexVal.replace('#',''))
    render(drawMethod, verticesArr, colorRGB)
  }

  if (geoObject == "square"){
    x_one = e.pageX
    y_one = e.pageY

    if(x_one < 40){
      x_one = 40
    }

    if (y_one < 40){
      y_one = 40
    }

    renderSquare()
    hexVal =  document.getElementById("color-input").value
    colorRGB = hexToRgbNew(hexVal.replace('#',''))
    // render(drawMethod, verticesArr, colorRGB)
    // renderAll()
  }
};

var mouseUp = function(e){
  if (!isDrawing && geoObject != '') {
    const shape = {
      method: drawMethod,
      vertices: verticesArr,
      rgbVal: colorRGB
    }
    
    allShapes.push(shape)
    renderAll()
    geoObject = ""
  }
};

var renderSquare = () => {
  const size = parseInt(document.getElementById('size-input').value)
  if(x_one < 40){
    x_one = 40
  }
  if (y_one < 40){
    y_one = 40
  }

  x_one = x_one - size/2
  y_one = y_one + size/2
  x_two = x_one + size
  y_two = y_one

  drawMethod = gl.TRIANGLE_STRIP
  verticesArr = [
    getCoorX(x_one), 
    getCoorY(y_one), 
    getCoorX(x_two), 
    getCoorY(y_two),

    getCoorX(x_one), 
    getCoorY(y_one - size), 
    getCoorX(x_two), 
    getCoorY(y_two - size),
  ]
}

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
canvas.addEventListener("mousemove", mouseMove);