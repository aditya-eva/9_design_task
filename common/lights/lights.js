
import * as THREE from "three";

export function addLights(scene) {

  const lights = {};

  lights.ambient = new THREE.AmbientLight(0xffffff, 1);

  lights.directional = new THREE.DirectionalLight(0xffffff, 2);
  lights.directional.position.set(2, 5, 5);
  lights.directional.castShadow = true;

  lights.point = new THREE.PointLight(0xffffff, 50);
  lights.point.position.set(-1, 3, 1);
  lights.point.castShadow = true;

  lights.spot = new THREE.SpotLight(0xffffff, 50);
  lights.spot.position.set(0, 4, 0);
  lights.spot.angle = Math.PI / 6;
  lights.spot.castShadow = true;

  // Add all lights initially
  Object.values(lights).forEach(light => scene.add(light));

  return lights;
}