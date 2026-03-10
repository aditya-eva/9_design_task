import * as THREE from "three";

export function createStarShape(side) {
    const cos30 = Math.cos(30*Math.PI/180);
    const sin30 = Math.sin(30*Math.PI/180);
    const cos60 = Math.cos(60*Math.PI/180);
    const sin60 = Math.sin(60*Math.PI/180);
    const path = new THREE.Path();
    path.moveTo(0, 0);
    path.lineTo(side*sin30, side*cos30);
    path.lineTo(side*sin30+side, side*cos30);
    path.lineTo(side*sin30+side-side*cos60, side*cos30+side*sin60);
    path.lineTo(side*sin30+side, side*cos30+2*side*sin60);
    path.lineTo(side*sin30, side*cos30+2*side*sin60);
    path.lineTo(0, 2*side*cos30+2*side*sin60);
    path.lineTo(-side*sin30, side*cos30+2*side*sin60);
    path.lineTo(-(side*sin30+side), side*cos30+2*side*sin60);
    path.lineTo(-(side*sin30+side-side*cos60), side*cos30+side*sin60);
    path.lineTo(-(side*sin30+side), side*cos30);
    path.lineTo(-side*sin30, side*cos30);
    path.lineTo(0, 0);
    
    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });
    const line = new THREE.Line(geometry, material);
    line.position.y = side/2;
    return line;
}