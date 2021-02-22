const render = () => {
  var aspect = canvas.width / canvas.height;
  // gl.clear(gl.COLOR_BUFFER_BIT)
  
  // Prepare vertices
  var vertices = new Float32Array([
    -0.5, 0.5*aspect, 0.5, 0.5*aspect, 0.5,-0.5*aspect, // Triangle 1
    -0.5, 0.5*aspect, 0.5,-0.5*aspect, -0.5,-0.5*aspect // Triangle 2
    ]);
  
  // Prepare Vertex
  const vert = `
  attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `
  
  var vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, vert)
  gl.compileShader(vertexShader)
  
  
  // Prepare Fragment
  const frag = `
    precision highp float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }
  `
  
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fragmentShader, frag)
  gl.compileShader(fragmentShader)
  
  var program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  
  
  // Binding data
  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  
  // Use the program
  gl.useProgram(program)
  
  program.color = gl.getUniformLocation(program, 'color')
  gl.uniform4fv(program.color, getArrColor(30, 137, 143, 1))
  
  // Set the position
  program.position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(program.position)
  gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)
  
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length / 2)
}
