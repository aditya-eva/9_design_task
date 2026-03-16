import * as THREE from "three";
import { createBackSet } from "./createBackSet";

export function createHandle({
  length = 150,
  width = 40,
  depth,
  side = "left"
} = {}) {

  const group = new THREE.Group();

  const objectBack = createBackSet(0, 0, width/2, length/1.5);
  const backSet = objectBack.mesh;
  // console.log(backSet)
  group.add(backSet);

  const pivot = new THREE.Group();
  backSet.add(pivot);
  // console.log(backSet)

  pivot.position.set(width/4, length/15, 0);
  pivot.position.z += objectBack.depth

  const v1 = {
    x: pivot.position.x,
    y: pivot.position.y,
    z: pivot.position.z - 1
  }
  
  const sphereGeo = new THREE.SphereGeometry(5);

  const sphereMat = new THREE.MeshStandardMaterial({
    color: "white"
  })

  const sphere = new THREE.Mesh(sphereGeo, sphereMat);

  sphere.position.set(v1.x , v1.y + v1.y/2, v1.z + depth);

  group.add(sphere)

  const fx = width / 50;
  const fy = length / 200;

  const material = new THREE.MeshStandardMaterial({
    color: "black",
    roughness: 0.3,
    metalness: 0.2
  });

  // -------- HANDLE TOP --------

  const path = new THREE.CurvePath();

  path.add(
    new THREE.CubicBezierCurve(
      new THREE.Vector2(14 * fx, -5 * fy),
      new THREE.Vector2(14 * fx, 25 * fy),
      new THREE.Vector2(-13 * fx, 25 * fy),
      new THREE.Vector2(-13 * fx, 15 * fy)
    )
  );

  path.add(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-13 * fx, 15 * fy, 0),
      new THREE.Vector3(-20 * fx, 5 * fy, 0),
      new THREE.Vector3(0, -5 * fy, 0)
    ])
  );

  const shape = new THREE.Shape(path.getPoints(100));

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth,
    bevelEnabled: false
  });

  const mesh = new THREE.Mesh(geometry, material);

  pivot.add(mesh);
  
  // -------- HANDLE STEM --------
  
  const path2 = new THREE.CurvePath();
  
  path2.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -8 * fy, 0),
      new THREE.Vector3(0, -10 * fy, 0),
      new THREE.Vector3(0, -15 * fy, depth),
      new THREE.Vector3(0, -20 * fy, depth)
    )
  );
  
  path2.add(
    new THREE.LineCurve3(
      new THREE.Vector3(0, -20 * fy, depth),
      new THREE.Vector3(0, -45 * fy, depth)
    )
  );
  
  const shape2 = new THREE.Shape();
  
  shape2.moveTo(0, 0);
  shape2.lineTo(14 * fx, 0);
  shape2.lineTo(14 * fx, depth);
  shape2.lineTo(0, depth);
  shape2.lineTo(0, 0);
  
  const geometry2 = new THREE.ExtrudeGeometry(shape2, {
    steps: 200,
    extrudePath: path2,
    bevelEnabled: false
  });
  
  const mesh2 = new THREE.Mesh(geometry2, material);
  mesh2.position.set(14 * fx, 3 * fy, depth);
  
  pivot.add(mesh2);
  
  const path3 = new THREE.CurvePath();
  path3.add(new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -45 * fy, 0),      // start (existing end)
    new THREE.Vector3(0, -60 * fy, 0),  // control point 1
    new THREE.Vector3(14*fx, -60 * fy, 0),  // control point 2
    new THREE.Vector3(14*fx, -45 * fy, 0)       // final handle end
  ))
  const semiShape = new THREE.Shape(path3.getPoints(100));

  const semiGeo = new THREE.ExtrudeGeometry(semiShape, {
    depth: depth,
    bevelEnabled: false
  });
  const semiMesh = new THREE.Mesh(semiGeo, material);
  semiMesh.position.z = depth
  semiMesh.position.y += 3 * fy
  pivot.add(semiMesh);

  // -------- LEFT / RIGHT HANDLE --------
  
  if (side === "right") {

    // mirror geometry
    group.scale.x = -1;

    // shift because mirror flips origin
    // group.position.x = 20;

  }

  return group;
}