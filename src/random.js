export function randInt(min, max) {
  return min + Math.floor(Math.random() * (max-min+1))
}

export function randomElement(array) {
  return array[randInt(0, array.length-1)]
}
