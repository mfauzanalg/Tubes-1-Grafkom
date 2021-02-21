// Prepare canvas
var canvas = document.createElement('canvas')
canvas.width = 500
canvas.height = 500
document.body.appendChild(canvas)

var gl = canvas.getContext('webgl2')

const getGLColor = (r, g, b, a) => {
  gl.clearColor(r/255, g/255, b/255, a);
}

getGLColor(120, 105, 122, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

// Prepare vertices
var vertices = new Float32Array([
  -0.5,-0.5,
  0.5,-0.5,
  0.0,0.5
])

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

// Set the color
const getArrColor = (r,g,b,a) => {
  return [r/255, g/255, b/255, a]
}

program.color = gl.getUniformLocation(program, 'color')
gl.uniform4fv(program.color, getArrColor(255, 255, 0, 1))

// Set the position
program.position = gl.getAttribLocation(program, 'position')
gl.enableVertexAttribArray(program.position)
gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)

gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2)