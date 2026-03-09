import * as THREE from "three"
export function topBead(width, outerH1, beadHeight) {
    const path = new THREE.Path();
    path.moveTo(0, 0);
    path.lineTo(width - 2*outerH1, 0);
    path.lineTo(width - 2*outerH1 - beadHeight, -beadHeight);
    path.lineTo(beadHeight, -beadHeight);
    path.lineTo(0, 0);
    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });
    const line = new THREE.Line(geometry, material);
    return line;
}