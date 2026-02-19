import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const color = textureLoader.load('assets/color.jpg');
const roughness = textureLoader.load('assets/roughness.jpg');
const normal = textureLoader.load('assets/normal.jpg');

export const materials = {
  standard: new THREE.MeshStandardMaterial({
    map: color,
    roughnessMap: roughness,
    normalMap: normal,
  }),
  
  phong: new THREE.MeshPhongMaterial({
    color: "white",
    shininess: 100
  }),

  basic: new THREE.MeshBasicMaterial({
    color: "red",
    wireframe: true
  }),

  normal: new THREE.MeshNormalMaterial()
};
