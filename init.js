// Prepare canvas
var canvas = document.createElement('canvas')
canvas.width = canvasWidth
canvas.height = canvasHeight
document.body.appendChild(canvas)

var gl = canvas.getContext('webgl')