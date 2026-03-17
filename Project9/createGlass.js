import * as THREE from "three";


export function createGlassForWindow(length, width) {


  const glassGeometry = new THREE.BoxGeometry(length, width, 20);


  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: "#8fc8dd",
    transparent: true,
    transmission: 0.65,
    ior: 2.32,
    metalness: 0,
    roughness: 0,
    side: THREE.DoubleSide
  });


  const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);


  const size = Math.min(length, width) * 0.3;
  const vertices = new Float32Array([
    -size/2, 0, 11,  
    size/2, 0, 11,  
    0, -size/2, 11,
    0, size/2, 11    
  ]);


  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertices, 3)
  );


  const lineMaterial = new THREE.LineBasicMaterial({
    color: "black"
  });


  const plusLines = new THREE.LineSegments(lineGeometry, lineMaterial);
  glassMesh.add(plusLines);


  return glassMesh;
}
