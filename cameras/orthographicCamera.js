import * as THREE from "three";

export function orthographicCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  const size = 6;
  const camera = new THREE.OrthographicCamera(
    -size * aspect / 2,
    size * aspect / 2,
    size / 2,
    -size / 2,
    0.1,
    100
  );
  camera.position.set(40, 20, 40);
  camera.lookAt(0, 0, 0);
  return camera;
}
