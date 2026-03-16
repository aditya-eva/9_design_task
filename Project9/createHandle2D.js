import * as THREE from "three";

export function createHandle2D() {
  const group = new THREE.Group();
  const path = new THREE.Path();
  const length = 150;
  const width = 40;

  path.moveTo(0, 0);
  const py = -2 * length / 3 + 0.2 * 2 * length / 3
  path.lineTo(0, py);
  path.bezierCurveTo(0, -2*length/3, width/3, -2*length/3, width/3, py);
  path.lineTo(width/3, 0);
  path.splineThru([
    new THREE.Vector3(width/3, 0, 0), 
    new THREE.Vector3(width/3, length/6, 0),
    new THREE.Vector3(0, length/4, 0),
    new THREE.Vector3(-width/6, length/4 - length/20, 0)
  ])
  path.splineThru([
    new THREE.Vector3(-width/6, length/4 - length/20, 0), 
    new THREE.Vector3(-width/2, length/6, 0),
    new THREE.Vector3(0, 0, 0)
  ])
  // path.moveTo(-width/3, length/4 - length/20);
  // path.lineTo(-width/3, length/3)
  const geometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(100));

  const material = new THREE.LineBasicMaterial({
    color: "black",
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Line(geometry, material);
  group.add(mesh);
  
  const path2 = new THREE.Path();
  path2.moveTo(-width/6, length/4 - length/20);
  path2.lineTo(-width/6, length/3);
  path2.lineTo(0, length/3);
  path2.lineTo(width/6, length/4);
  path2.lineTo(width/3 - width/20, length/4 - length/30);
  path2.lineTo(width/3 - width/20, length/4 - length/16);

  const geometry2 = new THREE.BufferGeometry().setFromPoints(path2.getPoints(100));

  const material2 = new THREE.LineBasicMaterial({
    color: "black",
    side: THREE.DoubleSide
  });
  const mesh2 = new THREE.Line(geometry2, material2);
  group.add(mesh2);

  const path3 = new THREE.Path();
  path3.moveTo(-2, length/12)
  path3.moveTo(-2, 0)
  // path3.moveTo(-2, 0)
  
  const geometry3 = new THREE.BufferGeometry().setFromPoints(path3.getPoints(100));

  const material3 = new THREE.LineBasicMaterial({
    color: "black",
    side: THREE.DoubleSide
  });
  const mesh3 = new THREE.Line(geometry3, material3);
  group.add(mesh3)
  return group;
}