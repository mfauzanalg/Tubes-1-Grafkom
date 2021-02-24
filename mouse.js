// Mouse Move
var drag = false;
var x_one, x_two, y_one, y_two

// Type object
var drawMethod;
var verticesArr = [];
var isDrawing = false;
var hexVal;
var colorRGB;
var resizeArr = [];
var polyArr;
var sideInput;
var dragged = {
  shape_id: null,
  param: null
}


var isResizing = false
var resizePoints = []
var idx = 0
var x_inter = 0;
var y_inter = 0;

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
  if(isResizing) {
    isResizing = false
    resizePoints = []
    idx = 0
    x_inter = 0
    y_inter = 0
  }

  if(change == 1 && !isDrawing){
      x_one = e.pageX;
      y_one = e.pageY;
      var found = false;
      hexVal =  document.getElementById("color-input").value
      colorRGB = hexToRgbNew(hexVal.replace('#',''))
      for (var i=0 ; i<allShapes.length;i++) {
          
            var points = []
            for (var j=0; j<allShapes[i].vertices.length;j=j+2){
              points.push([allShapes[i].vertices[j],allShapes[i].vertices[j+1]])
            }
            if(inside([getCoorX(x_one),getCoorY(y_one)], points)){
              found = true;
              change = 0;
              break;
            }
          
      }
      if(found){
        allShapes[i].rgbVal = colorRGB;
        renderAll();
      }
  }

  if(resize == 1 && !isDrawing){
    x_one = e.pageX;
      y_one = e.pageY;
      var found = false;
      for (var i=0 ; i<allShapes.length;i++) {
            idx = i
            if(allShapes[i].vertices.length == 8){
              resizePoints = []
              for (var j=0; j<allShapes[i].vertices.length;j=j+2){
                resizePoints.push([allShapes[i].vertices[j],allShapes[i].vertices[j+1]])
              }
              if(inside([getCoorX(x_one),getCoorY(y_one)], resizePoints)){
                found = true;
                resize = 0;
                break;
              }
          }
      }
      
      if(found){
        x_inter = e.pageX
        y_inter = e.pageY
        isResizing = true
        renderAll();
        resize = 0;
      }
  }
  if(geoObject != ''){
    x_one = e.pageX 
    y_one = e.pageY;
    if (geoObject == "line"){
      isDrawing = !isDrawing;
    } else if (geoObject == "square"){
      isDrawing = !isDrawing
    } else if (geoObject == "random") {
      if (nRandom) {
        nRandom = nRandom - 1
        randomArr.push(getCoorX(x_one))
        randomArr.push(getCoorY(y_one))
      }
    } 
  }

  if (!isDrawing && !drag){
    if (geoObject == "polygon"){
      renderPoly(getCoorX(e.pageX), getCoorY(e.pageY))
      const shape = {
        method: gl.TRIANGLE_FAN,
        vertices: polyArr,
        rgbVal: colorRGB
      }
      allShapes.push(shape)
      renderAll()
      geoObject = ""
    } else if (geoObject == '') {
      x_one = e.pageX
      y_one = e.pageY

      var pos = [getCoorX(x_one),getCoorY(y_one)]

      var found = point_obj.some((val,idx) => {
        var vert = []
        for (var i = 0; i < val.vertex.length; i+=2){
          vert.push([val.vertex[i],val.vertex[i+1]])
        }
        if (inside(pos, vert)){
          dragged.shape_id = val.shape_id
          dragged.param = val.param
          return true
        }
      })

      if(found){
        drag = true
      }
    }
  } else if (drag) drag = false

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
    } else if (geoObject == "square"){
      drawMethod = gl.TRIANGLE_FAN
      var size_x = x_two - x_one
      var size_y = y_two - y_one

      var distance = Math.sqrt(Math.pow(size_x,2)+Math.pow(size_y,2))
      x_two = x_one + (distance*Math.sign(size_x))
      y_two = y_one + (distance*Math.sign(size_y))

      x_left = Math.min(x_one, x_two)
      x_right = Math.max(x_one, x_two)

      y_up = Math.min(y_one,y_two)
      y_down = Math.max(y_one, y_two)
      
      verticesArr = [
        getCoorX(x_left), getCoorY(y_up), 
        getCoorX(x_right), getCoorY(y_up),
        getCoorX(x_right), getCoorY(y_down),
        getCoorX(x_left), getCoorY(y_down)
      ]
    }
    renderAll()
    hexVal =  document.getElementById("color-input").value
    colorRGB = hexToRgbNew(hexVal.replace('#',''))
    render(drawMethod, verticesArr, colorRGB)
  }

  if (isDrawingRandom) {
    hexVal =  document.getElementById("color-input").value
    colorRGB = hexToRgbNew(hexVal.replace('#',''))

    const copyOfrandomArr = randomArr.slice()
    copyOfrandomArr.push(getCoorX(x_two))
    copyOfrandomArr.push(getCoorY(y_two))

    render(gl.TRIANGLE_FAN, copyOfrandomArr, colorRGB)
    render(gl.POINTS, copyOfrandomArr, [1,0,0])
    renderAll()
  }

  else if (drag) {
    allShapes[dragged.shape_id].vertices[dragged.param*2] = getCoorX(x_two)
    allShapes[dragged.shape_id].vertices[dragged.param*2+1] = getCoorY(y_two)
    renderAll()
  }

  if (isResizing) {
    renderResize((resizePoints[0][0]+resizePoints[2][0])/2, (resizePoints[0][1]+resizePoints[2][1])/2, e.pageX, (resizePoints[2][0]-resizePoints[0][0]))
    allShapes[idx].vertices = resizeArr;
    renderAll()
  }
};

var mouseUp = function(e){
  if (!isDrawing && geoObject != '') {
    if (geoObject == 'line'){
      const shape = {
        method: drawMethod,
        vertices: verticesArr,
        rgbVal: colorRGB
      }
      
      allShapes.push(shape)
      renderAll()
      geoObject = ""
    } else if (geoObject == 'square'){
      const shape = {
        method: drawMethod,
        vertices: verticesArr,
        rgbVal: colorRGB
      }
      allShapes.push(shape)
      renderAll()
      geoObject = ""
    }
  }

  if (isDrawingRandom && nRandom == 0){
    hexVal =  document.getElementById("color-input").value
    colorRGB = hexToRgbNew(hexVal.replace('#',''))

    const shape = {
      method: gl.TRIANGLE_FAN,
      vertices: randomArr,
      rgbVal: colorRGB
    }
    allShapes.push(shape)
    renderAll()
    geoObject = ""
    randomArr = []
    isDrawingRandom = false
  }

  if (drag) {
    document.getElementById("moving-line").style.display = "block"
  } else{
    document.getElementById("moving-line").style.display = "none"
  }
};

var renderResize = (a,b,e,sizedef) => {

  var middleX_new = 0;
  if (a > 0){
    middleX_new = 250 + a*250
  }
  else {
    new_a = a*-1
    middleX_new = new_a*250
    middleX_new = 250 - middleX_new
  }

  var coorX = 0
  if(e >= a){
    coorX = (e - middleX_new) / middleX_new
  }
  e = coorX

  var coorSize = e
  
  resizeArr = [
    a-coorSize,
    b+coorSize,
    a+coorSize,
    b+coorSize,
    a+coorSize,
    b-coorSize,
    a-coorSize,
    b-coorSize,
  ]
}

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