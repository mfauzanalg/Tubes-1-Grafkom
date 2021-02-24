// Prepare Vertex
const vert = `
attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

// Prepare Fragment
const frag = `
precision highp float;
uniform vec4 color;
void main() {
  gl_FragColor = color;
}
`
// Vertex Shaders
var vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vert)
gl.compileShader(vertexShader)

// Fragment Shaders
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, frag)
gl.compileShader(fragmentShader)

// Programs
var program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)