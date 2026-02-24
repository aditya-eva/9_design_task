import * as THREE from "three";

export function createFloor() {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: "#70654d" })
  );

  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -2, 0);
  floor.receiveShadow = true;

  return floor;
}
