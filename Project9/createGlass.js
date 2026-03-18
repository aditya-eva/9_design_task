import * as THREE from "three";


export function createGlassForWindow(length, width) {
  const glassGeometry = new THREE.BoxGeometry(length, width, 20);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: "#57a5c2",
    transparent: true,
    transmission: 0.65,
    ior: 2.32,
    metalness: 0,
    roughness: 0,
    side: THREE.DoubleSide
  });


  const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);

  const plusSize = Math.min(length, width) * 0.3;
  const plusVertices = new Float32Array([
    -plusSize/2, 0, 11,  
    plusSize/2, 0, 11,  
    0, -plusSize/2, 11,
    0, plusSize/2, 11    
  ]);

  const plusGeometry = new THREE.BufferGeometry();
  plusGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(plusVertices, 3)
  );

  const plusMaterial = new THREE.LineBasicMaterial({
    color: "black"
  });

  const plusLines = new THREE.LineSegments(plusGeometry, plusMaterial);
  glassMesh.add(plusLines);

  return glassMesh;
}
