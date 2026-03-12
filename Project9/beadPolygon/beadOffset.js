export function beadOffset(mesh, outerFramePolygon, index, outerH1) {
  if (index === 0) {
    mesh.position.y += outerH1;
  } 
  if (index === 2) {
    mesh.position.y -= outerH1;
  } 
  if (index === 1) {
    mesh.position.x -= outerH1;
  } 
  if (index === 3) {
    mesh.position.x += outerH1;
  } 
  mesh.position.z = outerFramePolygon.children[index].position.z;
}