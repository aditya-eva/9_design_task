import * as THREE from "three";

export function createFloor() {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: "brown" })
  );

  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2;
  floor.receiveShadow = true;

  return floor;
}
