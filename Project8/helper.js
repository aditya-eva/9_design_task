import * as THREE from "three"
import { TextGeometry } from "three/examples/jsm/Addons.js";

export function createText(label, x, y, font, result) {
    const geo = new TextGeometry(label, {
        font: font,
        size: 4,
        depth: 1
    });
    geo.center();
    const mat = new THREE.MeshBasicMaterial({ color: "black" });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, 1);
    mesh.userData.text = label;
    result.group.add(mesh);
    result.editableMeshes.push(mesh);
}