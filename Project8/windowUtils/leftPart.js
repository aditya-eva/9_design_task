import * as THREE from "three"
import { leftBead } from "../beadUtils/leftBead";
export function leftPart(height, outerH1, beadHeight) {
    const path = new THREE.Path();
    path.moveTo(0, 0);
    path.lineTo(outerH1, outerH1);
    path.lineTo(outerH1, height-outerH1);
    path.lineTo(0, height);
    path.lineTo(0, 0);
    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });
    const line = new THREE.Line(geometry, material);
    const leftSectionBead = leftBead(height, outerH1, beadHeight);
    leftSectionBead.position.y = line.position.y + outerH1;
    leftSectionBead.position.x = line.position.x + outerH1;
    line.add(leftSectionBead);
    return line;
}