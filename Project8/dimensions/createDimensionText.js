import * as THREE from "three"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";


export function createDimensionText(text, font) {
    const geometry = new TextGeometry(text, {
        font: font,
        size: 4,
        height: 0,
        depth:1
    });
    const material = new THREE.MeshBasicMaterial({ color: "black" });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}


