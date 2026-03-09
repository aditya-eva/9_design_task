import * as THREE from "three"
import { bottomBead } from "../beadUtils/bottomBead";
export function bottomPart(width, outerH1, beadHeight) {
    const path = new THREE.Path();
    path.moveTo(0, 0);
    path.lineTo(width, 0);
    path.lineTo(width - outerH1, outerH1);
    path.lineTo(outerH1, outerH1);
    path.lineTo(0, 0);
    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });
    const line = new THREE.Line(geometry, material);
    const bottomSectionBead = bottomBead(width, outerH1, beadHeight);
    bottomSectionBead.position.y = line.position.y + outerH1;
    bottomSectionBead.position.x = line.position.x + outerH1;
    line.add(bottomSectionBead);
    return line;
}