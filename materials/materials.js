import * as THREE from "three";

export const materials = {
  standard: new THREE.MeshStandardMaterial({
    color: "#049ef4",
    roughness: 0.2,
    metalness: 0.8
  }),
  
  phong: new THREE.MeshPhongMaterial({
    color: "#049ef4",
    shininess: 400
  }),

  basic: new THREE.MeshBasicMaterial({
    color: "#49ef4",
    side: THREE.DoubleSide
  }),

  normal: new THREE.MeshNormalMaterial({flatShading: true})
};
