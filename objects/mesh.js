import * as THREE from "three";
import { geometries } from "../geometries/geometries.js";
import { materials } from "../materials/materials.js";

export const mesh = new THREE.Mesh(
  geometries.box(),
  materials.standard
);

mesh.castShadow = true;
mesh.receiveShadow = true;
