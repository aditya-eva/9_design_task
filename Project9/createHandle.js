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

  // handle takes 90% of the total length
  const handleLength = 0.9 * length;

  // backplate
  const objectBack = createBackSet(0, 0, width, 0.1*length + handleLength * 0.25, backSetDepth);
  const backSet = objectBack.mesh;
  group.add(backSet);

  // this part will find the center of the backplate/backSet
  const box = new THREE.Box3().setFromObject(backSet);
  const center = new THREE.Vector3();
  box.getCenter(center);

  // groupng the handle
  const handleGroup = new THREE.Group();
  // handleGroup.position.set(originX, originY, 0)


  // sphere on the handle part to give a pivot point type feel
  const sphereOnHandle = new THREE.SphereGeometry(width / 10);
  const sphereOnHandleMaterial = new THREE.MeshStandardMaterial({
    color: "white"
  })
  const sphereOnHandleMesh = new THREE.Mesh(sphereOnHandle, sphereOnHandleMaterial);
  sphereOnHandleMesh.position.z = depth
  handleGroup.add(sphereOnHandleMesh)

  // material for the handle
  const material = new THREE.MeshStandardMaterial({
    color: "black",
    roughness: 0.3,
    metalness: 0.2
  });

  // Handle Top Beak Part
  const beakPath = new THREE.CurvePath();
  beakPath.add(
    new THREE.CubicBezierCurve(
      new THREE.Vector2(width/3, originY -handleLength/8),
      new THREE.Vector2(width/3, handleLength/8),
      new THREE.Vector2(-width/3, handleLength/8),
      new THREE.Vector2(-width/3, handleLength/16)
    )
  );
  beakPath.add(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-width/3, handleLength/16, 0),
      new THREE.Vector3(-2*width/3, 0, 0),
      new THREE.Vector3(0, -handleLength/8, 0)
    ])
  );
  const beakShape = new THREE.Shape(beakPath.getPoints(100));
  const geometry = new THREE.ExtrudeGeometry(beakShape, {
    depth: depth,
    bevelEnabled: false
  });
  const beakMesh = new THREE.Mesh(geometry, material);
  handleGroup.add(beakMesh);



  // Mid connecting part: first draw a curve as per the requirement then extrude a box along that part
  const connectingPath = new THREE.CurvePath();
  connectingPath.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, -handleLength/8, 0),
      new THREE.Vector3(0, -handleLength/7, 0),
      new THREE.Vector3(0, -handleLength/5, depth),
      new THREE.Vector3(0, -handleLength/4, depth)
    )
  );
  connectingPath.add(
    new THREE.LineCurve3(
      new THREE.Vector3(0, -handleLength/4, depth),
      new THREE.Vector3(0, -7*handleLength/8 + 5*handleLength/32, depth)
    )
  );
  const shapeTobeExtrudedAlongConnectingPath = new THREE.Shape();
  shapeTobeExtrudedAlongConnectingPath.moveTo(0, 0);
  shapeTobeExtrudedAlongConnectingPath.lineTo(width/3, 0);
  shapeTobeExtrudedAlongConnectingPath.lineTo(width/3, depth);
  shapeTobeExtrudedAlongConnectingPath.lineTo(0, depth);
  shapeTobeExtrudedAlongConnectingPath.lineTo(0, 0);

  const geometryOfTheExtrudedShape = new THREE.ExtrudeGeometry(shapeTobeExtrudedAlongConnectingPath, {
    steps: 2000,
    extrudePath: connectingPath,
    bevelEnabled: false
  });


  const connectingPartMesh = new THREE.Mesh(geometryOfTheExtrudedShape, material);
  connectingPartMesh.position.set(width/3, 0, depth);
  handleGroup.add(connectingPartMesh);


  // final U shaped bend
  const uShapedBendPath = new THREE.CurvePath();
  uShapedBendPath.add(new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -7*handleLength/8 + 5*handleLength/32, 0),
    new THREE.Vector3(0, -handleLength + handleLength/8, 0),
    new THREE.Vector3(width/3, -handleLength + handleLength/8, 0),
    new THREE.Vector3(width/3, -7*handleLength/8 + 5*handleLength/32, 0)
  ))
  const uShapedBendShape = new THREE.Shape(uShapedBendPath.getPoints(100));
  const uShapedGeometry = new THREE.ExtrudeGeometry(uShapedBendShape, {
    depth: depth,
    bevelEnabled: false
  });
  const uShapedMesh = new THREE.Mesh(uShapedGeometry, material);
  uShapedMesh.position.z = depth
  handleGroup.add(uShapedMesh);

  //position the handle group at the center of the backplate
  handleGroup.position.copy(center);
  handleGroup.position.z = backSetDepth
  group.add(handleGroup)


  // -------- LEFT / RIGHT HANDLE --------
  if (side === "right") {
    group.scale.x = -1;
  }
  return group;
}
