import * as THREE from "three";

export function createArrow(size) {

    const path = new THREE.Path();

    path.moveTo(0, 0);
    path.lineTo(0, size);
    path.moveTo(-size/4, size*0.75);
    path.lineTo(0, size);
    path.lineTo(size/4, size*0.75);
    
    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });
    const line = new THREE.Line(geometry, material); 

    return line;
}