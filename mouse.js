
// Mouse Move
var drag = false;
var x_one, x_two, y_one, y_two

var mouseDown = function(e) {
  console.log("DOWN")
  drag = true;
  x_two = e.pageX 
  y_two = e.pageY;

  e.preventDefault();
  return false;
};

var mouseUp = function(e){
  console.log("UP")
  // render()
  drag = false;
};

var mouseMove = function(e) {
  x_one = e.pageX
  y_one = e.pageY
  e.preventDefault();
};

canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mouseup", mouseUp, false);
canvas.addEventListener("mousemove", mouseMove, false);