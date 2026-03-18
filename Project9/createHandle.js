import * as THREE from "three";
import { createBackSet } from "./createBackSet";




export function createHandle({
  originX,
  originY,
  length = 150,
  width = 40,
  depth,
  backSetDepth,
  side = "left"
} = {}) {


  const group = new THREE.Group();
  const handleLength = 0.9 * length;


  const objectBack = createBackSet(0, 0, width, 0.1*length + handleLength * 0.25, backSetDepth);
  const backSet = objectBack.mesh;
  group.add(backSet);


  const box = new THREE.Box3().setFromObject(backSet);
  const center = new THREE.Vector3();
  box.getCenter(center);


  const handleGroup = new THREE.Group();
  handleGroup.position.set(originX, originY, 0)
  const sphere = new THREE.SphereGeometry(width / 10);
  const sphMat = new THREE.MeshStandardMaterial({
    color: "white"
  })
  const sphereMesh = new THREE.Mesh(sphere, sphMat);
  sphereMesh.position.z = depth
  handleGroup.add(sphereMesh)


  const material = new THREE.MeshStandardMaterial({
    color: "black",
    roughness: 0.3,
    metalness: 0.2
  });


  // -------- HANDLE TOP --------
  const path = new THREE.CurvePath();
  path.add(
    new THREE.CubicBezierCurve(
      new THREE.Vector2(width/3, originY -handleLength/8),
      new THREE.Vector2(width/3, handleLength/8),
      new THREE.Vector2(-width/3, handleLength/8),
      new THREE.Vector2(-width/3, handleLength/16)
    )
  );
  path.add(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-width/3, handleLength/16, 0),
      new THREE.Vector3(-2*width/3, 0, 0),
      new THREE.Vector3(0, -handleLength/8, 0)
    ])
  );
  const shape = new THREE.Shape(path.getPoints(100));
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth,
    bevelEnabled: false
  });
  const mesh = new THREE.Mesh(geometry, material);
  handleGroup.add(mesh);


  // -------- HANDLE STEM --------
  const path2 = new THREE.CurvePath();
  path2.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -handleLength/8, 0),
      new THREE.Vector3(0, -handleLength/7, 0),
      new THREE.Vector3(0, -handleLength/5, depth),
      new THREE.Vector3(0, -handleLength/4, depth)
    )
  );
  path2.add(
    new THREE.LineCurve3(
      new THREE.Vector3(0, -handleLength/4, depth),
      new THREE.Vector3(0, -7*handleLength/8 + 5*handleLength/32, depth)
    )
  );
  const shape2 = new THREE.Shape();
  shape2.moveTo(0, 0);
  shape2.lineTo(width/3, 0);
  shape2.lineTo(width/3, depth);
  shape2.lineTo(0, depth);
  shape2.lineTo(0, 0);


  const geometry2 = new THREE.ExtrudeGeometry(shape2, {
    steps: 2000,
    extrudePath: path2,
    bevelEnabled: false
  });


  const mesh2 = new THREE.Mesh(geometry2, material);
  mesh2.position.set(width/3, 0, depth);
  handleGroup.add(mesh2);
  const path3 = new THREE.CurvePath();


  path3.add(new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -7*handleLength/8 + 5*handleLength/32, 0),
    new THREE.Vector3(0, -handleLength + handleLength/8, 0),
    new THREE.Vector3(width/3, -handleLength + handleLength/8, 0),
    new THREE.Vector3(width/3, -7*handleLength/8 + 5*handleLength/32, 0)
  ))
  const semiShape = new THREE.Shape(path3.getPoints(100));


  const semiGeo = new THREE.ExtrudeGeometry(semiShape, {
    depth: depth,
    bevelEnabled: false
  });
  const semiMesh = new THREE.Mesh(semiGeo, material);
  semiMesh.position.z = depth


  handleGroup.add(semiMesh);
  handleGroup.position.copy(center);
  handleGroup.position.z = backSetDepth
  group.add(handleGroup)
  // -------- LEFT / RIGHT HANDLE --------
  if (side === "right") {
    group.scale.x = -1;
  }
  return group;
}
