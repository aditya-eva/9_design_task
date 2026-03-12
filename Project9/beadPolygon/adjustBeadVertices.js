export function adjustBeadVertices(arr, index, outerH1, beadHeight, length, breadth) {

  for (let i = 0; i < arr.length; i += 3) {
    let x = arr[i];
    let y = arr[i + 1];

    if (index === 0 || index === 2) {
      if (x === 0) {
        arr[i] = outerH1 + beadHeight;
      }
      if (x === length) {
        arr[i] = length - (outerH1 + beadHeight);
      }
    }

    if (index === 1 || index === 3) {
      if (y === 0) {
        arr[i + 1] = outerH1;
      }
      if (y === breadth) {
        arr[i + 1] = breadth - outerH1;
      }
    }

  }

}