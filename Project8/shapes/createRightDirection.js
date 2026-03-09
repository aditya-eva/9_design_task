import * as THREE from "three"
export function createRightDirection(size) {
    const path = new THREE.Path();

    path.moveTo(-size/2, size/4);
    path.lineTo(size/2, size/4);
    path.lineTo(size/2, size/2);
    path.lineTo(size, 0);
    path.lineTo(size/2, -size/2);
    path.lineTo(size/2, -size/4);
    path.lineTo(-size/2, -size/4);
    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: "black" });
    const line = new THREE.LineLoop(geometry, material);
    return line;
}