const getGLColor = (r, g, b, a) => {
  gl.clearColor(r/255, g/255, b/255, a);
}

const getArrColor = (r,g,b,a) => {
  return [r/255, g/255, b/255, a]
}