
// Mouse Move
var drag = false;
var x_one, x_two, y_one, y_two

// Type object
var drawMethod;
var verticesArr;
var isDrawing = false;

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
      vertices: verticesArr
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
    render(drawMethod, verticesArr)
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
    render(drawMethod, verticesArr)
    renderAll()
  }
};

var mouseUp = function(e){
  if (!isDrawing && geoObject != '') {
    const shape = {
      method: drawMethod,
      vertices: verticesArr
    }
    
    allShapes.push(shape)
    renderAll()
    geoObject = ""
  }
};

var renderSquare = () => {
  const size = 80
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