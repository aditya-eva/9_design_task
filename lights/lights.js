import * as THREE from "three";

export function addLights(scene) {
  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(5, 5, 5);
  directional.castShadow = true;
  scene.add(directional);

  const point = new THREE.PointLight(0xffffff, 0.5, 10);
  point.position.set(0, 2, 0);
  point.castShadow = true;
  scene.add(point);

  const spot = new THREE.SpotLight(0xffffff, 2);
  spot.position.set(1, 2, 2);
  spot.angle = Math.PI / 6;
  spot.castShadow = true;
  scene.add(spot);
}
