import { mesh } from "../objects/mesh.js";
import { geometries } from "../geometries/geometries.js";
import { materials } from "../materials/materials.js";
import * as THREE from "three";

let edgeLine = null;

export function setupKeyboard(scene) {

  function removeEdgeLine(scene) {
    if (edgeLine) {
      scene.remove(edgeLine);
      edgeLine = null;
    }
  }

  window.addEventListener("keydown", (e) => {
    {
        if(e.key !== "5") {
            scene.add(mesh);
            removeEdgeLine(scene);
        }
        if (e.key === "2") {
            mesh.geometry = geometries.capsule();
            mesh.material = materials.standard;
        } else if (e.key === "3") {
            mesh.geometry = geometries.cone();
            mesh.material = materials.standard;
        } else if (e.key === "4") {
            mesh.geometry = geometries.cylinder();
        } else if (e.key === "5") {
            scene.remove(mesh);
            const edgeGeometry = geometries.cone();
            const edges = new THREE.EdgesGeometry(edgeGeometry);
            edgeLine = new THREE.LineSegments(edges);
            scene.add(edgeLine);
        } else if (e.key === "6") {
            mesh.geometry = geometries.shapeArc();
        } else if (e.key === "7") {
            mesh.geometry = geometries.torus();
        } else if (e.key === "8") {
            mesh.geometry = geometries.tube();
            mesh.material = materials.phong;
        } else if (e.key === "9") {
            mesh.geometry = geometries.randomBuffer();
            mesh.material = materials.normal;
        } else {
            mesh.geometry = geometries.box();
            mesh.material = materials.standard;
        }
    }
  });
}
