import * as THREE from "three";

export const materials = {
  standard: new THREE.MeshStandardMaterial({
    color: "red",
    roughness: 1,
  }),
  
  phong: new THREE.MeshPhongMaterial({
    color: "white",
    shininess: 100
  }),

  basic: new THREE.MeshBasicMaterial({
    color: "red",
  }),

  normal: new THREE.MeshNormalMaterial()
};
