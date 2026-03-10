import * as THREE from "three";

export function createHexagonShape(side) {
    const cos60 = Math.cos(60*Math.PI/180);
    const sin60 = Math.sin(60*Math.PI/180);
    const path = new THREE.Path();
    path.moveTo(0, 0);
    path.lineTo(-side*sin60, side*cos60);
    path.lineTo(-side*sin60, side*cos60 + side);
    path.lineTo(0, 2*side*cos60 + side);
    path.lineTo(side*sin60, side*cos60 + side);
    path.lineTo(side*sin60, side*cos60);
    path.lineTo(0, 0);
    
    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });
    const line = new THREE.Line(geometry, material);
    line.position.y = 1;
    return line;
}