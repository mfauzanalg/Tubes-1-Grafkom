const canvasWidth = 500
const canvasHeight = 500
const middleX = canvasWidth/2
const middleY = canvasHeight/2

const getArrColor = (r,g,b,a) => {
  return [r/255, g/255, b/255, a]
}

const getCoorX = (x) => {
  var coorX = 0
  if(x >= 0){
    coorX = (x - middleX) / middleX
  }
  return coorX
}

const getCoorY = (y) => {
  var coorY = 0
  if(y >= 0){
    coorY = -1 * (y - middleY) / middleY
  }
  return coorY
}

var geoObject = ''
const drawObject = (objectName) => {
  geoObject = objectName
}

var allShapes = []