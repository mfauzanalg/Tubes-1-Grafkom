function render(type, vertices, rgbVal) {
  var n = initBuffers(new Float32Array(vertices), rgbVal);
  gl.drawArrays(type, 0, n);
}

function initBuffers(vertices, rgbVal) {
  // Binding data
  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  // Use the program
  gl.useProgram(program)

  // Set the color
  program.color = gl.getUniformLocation(program, 'color')
  gl.uniform4fv(program.color, getArrColor(rgbVal[0], rgbVal[1], rgbVal[2], 1))

  // Set the position
  program.position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(program.position)
  gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)

  return vertices.length / 2;
}

function renderPoints() {
  const pointSize = 5/middleX
  allShapes.forEach((shape, idx) => {
    var n = shape.vertices.length/2 // # of points
    for (var i = 0; i < n; i++){
      x = shape.vertices[i*2]-pointSize/2
      y = shape.vertices[i*2+1]-pointSize/2

      console.log(x)
      console.log(y)

      var pointVert = [
        x, y,
        x+pointSize, y,
        x, y+pointSize,
        x+pointSize, y+pointSize
      ]
      render(gl.TRIANGLE_STRIP, pointVert, hexToRgbNew('000000'))
    }
  })
}
function downloadObjectAsJson(){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allShapes));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", "download.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
function readSingleFile(evt) {
  var f = evt.target.files[0];

  if (f) {
      var r = new FileReader();
      r.onload = function (e) {
          var contents = e.target.result;
          allShapes = JSON.parse(contents);
          renderAll();
      }
      r.readAsText(f);
  } else {
      alert("Failed to load file");
  }
}
const renderAll = () => {
   allShapes.forEach((shape) => {
     render(shape.method, shape.vertices, shape.rgbVal)
     render(gl.POINTS, shape.vertices, [0, 0, 0])
   })
   renderPoints()
}
function inside(point, vs) {
  var x = point[0], y = point[1];
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  return inside;
  // var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
  // inside([ 1.5, 1.5 ], polygon); // true
}
