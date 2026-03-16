import * as THREE from "three";

export function createMeshWithEdges(geo, material, type, index) {
  const edgeGeo = new THREE.EdgesGeometry(geo, 45);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: "black" });
  const lineSeg = new THREE.LineSegments(edgeGeo, edgeMaterial);

  const mesh = new THREE.Mesh(geo, material);
  mesh.receiveShadow = true;
  mesh.add(lineSeg);
  mesh.userData.type = type;
  mesh.userData.id = index;

  return mesh;
}