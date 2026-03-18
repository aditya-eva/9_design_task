import * as THREE from "three";


export function createHandle2D(handleLen, handleWid, handleSide, handlePos) {
  const group = new THREE.Group();
  const path = new THREE.Path();

  // defining variables
  const length = handleLen;
  const width = handleWid;
  const originX = 0;
  const originY = 0;

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
    new THREE.Vector3(-width/6, length/12 + length/24, 0),
    new THREE.Vector3(0, length/12, 0),
    new THREE.Vector3(0, 0, 0)
  ])
  const geometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(100));

  const material = new THREE.LineBasicMaterial({
    color: "black",
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Line(geometry, material);
  // mesh.position.x = width/20
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
  path3.moveTo(0, 0)
  path3.lineTo(-1, 0)
  path3.lineTo(-width/6, 0)
  path3.lineTo(-width/6, length/8)
 
  const geometry3 = new THREE.BufferGeometry().setFromPoints(path3.getPoints(100));
  const material3 = new THREE.LineBasicMaterial({
    color: "black",
    side: THREE.DoubleSide
  });
  const mesh3 = new THREE.Line(geometry3, material3);
  group.add(mesh3)
  
  
  const arc = new THREE.Path();
  arc.absarc(0, 0, width/6);
  const geometry4 = new THREE.BufferGeometry().setFromPoints(arc.getPoints(100));
  const material4 = new THREE.LineBasicMaterial({
    color: "black",
    side: THREE.DoubleSide
  });
  const mesh4 = new THREE.Line(geometry4, material4);
  mesh4.position.y = length/6
  group.add(mesh4)


  const hole1 = new THREE.Path();
  hole1.absarc(0, 0, width/16);
  const hole1geo = new THREE.BufferGeometry().setFromPoints(hole1.getPoints(100));
  const hole1Mesh = new THREE.Line(hole1geo, material4);
  hole1Mesh.position.y = length/3 - length/24
  hole1Mesh.position.x = -width/3 + width/3.5
  group.add(hole1Mesh)

  const hole2 = new THREE.Path();
  hole2.absarc(0, 0, width/16);
  const hole2geo = new THREE.BufferGeometry().setFromPoints(hole2.getPoints(100));
  const hole2Mesh = new THREE.Line(hole2geo, material4);
  hole2Mesh.position.y = length/24
  hole2Mesh.position.x = -width/3 + width/3.5
  group.add(hole2Mesh)

  const start = new THREE.Vector3(
    -width/3 + width/3.5 - width/16,
    length/3 - length/24,
    0
  );
  const end = new THREE.Vector3(
    -width/6,
    length/3- length/24,
    0
  );
  const lineGeometry = new THREE.BufferGeometry().setFromPoints([start, end]);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: "black"
  });
  const lineMesh = new THREE.Line(lineGeometry, lineMaterial);
  group.add(lineMesh);

  const start2 = new THREE.Vector3(
    -width/3 + width/3.5 - width/16,
    length/24,
    0
  );
  const end2 = new THREE.Vector3(
    -width/6,
    length/24,
    0
  );
  const lineGeometry2 = new THREE.BufferGeometry().setFromPoints([start2, end2]);
  const lineMesh2 = new THREE.Line(lineGeometry2, lineMaterial);
  group.add(lineMesh2);


  if(handleSide === "right") {
    group.scale.x = -1;
  }
  return group;
}