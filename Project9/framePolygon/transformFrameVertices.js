export function transformFrameVertex(x, y, index, length, breadth) {

  // edge 0
  if (index === 0) {
    if (x === 0) return [y, y];
    if (x === length) return [length - y, y];
  }

  // edge 1
  if (index === 1) {
    if (y === 0) return [x, length - x];
    if (y === breadth) return [x, breadth - (length - x)];
  }

  // edge 2
  if (index === 2) {
    if (x === 0) return [breadth - y, y];
    if (x === length) return [length - (breadth - y), y];
  }

  // edge 3
  if (index === 3) {
    if (y === 0) return [x, x];
    if (y === breadth) return [x, breadth - x];
  }

  return [x, y];
}