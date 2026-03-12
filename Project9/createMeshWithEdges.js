import * as THREE from "three";

export function createMeshWithEdges(geo, material, type, index) {

  // Edges
  const edgeGeoMetryForMeshes = new THREE.EdgesGeometry(geo, 45);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: "red" });
  const lineSeg = new THREE.LineSegments(edgeGeoMetryForMeshes, edgeMaterial);

  // Mesh
  const mesh = new THREE.Mesh(geo, material);

  mesh.add(lineSeg);
  mesh.userData.type = type;
  mesh.userData.id = index;

  return mesh;
}