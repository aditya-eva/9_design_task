import * as THREE from "three"


export function createDimensionLine(startX, endX, y) {
    const points = [
        new THREE.Vector3(startX, y, 0),
        new THREE.Vector3(endX, y, 0)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });
    return new THREE.Line(geometry, material);
}
