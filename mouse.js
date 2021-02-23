
// Mouse Move
var drag = false;
var x_one, x_two, y_one, y_two

// Type object
var drawMethod;
var verticesArr;
var isDrawing = false;

var mouseDown = function(e) {
  x_one = e.pageX 
  y_one = e.pageY;
  isDrawing = !isDrawing;

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
      render(drawMethod, verticesArr)
    }
  }

  e.preventDefault();
};

var mouseUp = function(e){
  if (!isDrawing) {
    geoObject = ""
  }
};

canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mouseup", mouseUp, false);
canvas.addEventListener("mousemove", mouseMove, false);