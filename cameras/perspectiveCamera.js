import * as THREE from "three";

export function perspectiveCamera() {
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.set(10, 10, 0);
  camera.lookAt(0, 0, 0);
  return camera;
}
