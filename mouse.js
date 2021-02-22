
// Mouse Move
var drag = false;
var old_x, old_y;

var mouseDown = function(e) {
  drag = true;
  old_x = e.pageX, old_y = e.pageY;
  e.preventDefault();
  return false;
};

var mouseUp = function(e){
  drag = false;
};

var mouseMove = function(e) {
  old_x = e.pageX
  old_y = e.pageY
  e.preventDefault();
};

canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mouseup", mouseUp, false);
canvas.addEventListener("mouseout", mouseUp, false);
canvas.addEventListener("mousemove", mouseMove, false);