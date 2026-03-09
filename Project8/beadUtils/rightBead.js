import * as THREE from "three"
export function rightBead(height, outerH1, beadHeight) {
    const path = new THREE.Path();
    path.moveTo(0, 0);
    path.lineTo(beadHeight, beadHeight);
    path.lineTo(beadHeight, height - 2*outerH1 - beadHeight);
    path.lineTo(0, height - 2*outerH1);
    path.lineTo(0, 0);
    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });
    const line = new THREE.Line(geometry, material);
    line.rotateY(Math.PI);
    return line;
}