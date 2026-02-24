import * as THREE from "three";
import { geometries } from "../../common/geometries/geometries.js";
import { materials } from "../../common/materials/materials.js";

export const mesh = new THREE.Mesh(
  geometries.box(),
  materials.standard
);

mesh.castShadow = true;
mesh.receiveShadow = true;
