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

const renderAll = () => {
   allShapes.forEach((shape) => {
     render(shape.method, shape.vertices, shape.rgbVal)
     render(gl.POINTS, shape.vertices, [0, 0, 0])
   })
   renderPoints()
}