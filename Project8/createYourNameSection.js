import * as THREE from "three";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

export function createYourNameSection(posWid, posHei, width, height) {
    const group = new THREE.Group();

    const rx = width / 4;   
    const ry = height / 4;  
    const path = new THREE.Path();
    path.moveTo(0, 0);
    path.lineTo(0, ry);
    path.absellipse(rx, ry, rx, ry, Math.PI, Math.PI/2, true);
    path.lineTo(3*width/4, height/2);
    path.absellipse(3*width/4, ry, rx, ry, Math.PI/2, 0, true);
    path.lineTo(width, -ry);
    path.absellipse(3*width/4, -ry, rx, ry, 0, 3*Math.PI/2, true);
    path.lineTo(width/4, -height/2);
    path.absellipse(rx, -ry, rx, ry, 3*Math.PI/2, Math.PI, true);
    path.lineTo(0, 0);


    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });

    const border = new THREE.Line(geometry, material);
    group.add(border);


    const rows = [height/4, 0, -height/4];
    rows.forEach(y => {
        const rowPoints = [
            new THREE.Vector3(0, y, 0),
            new THREE.Vector3(width, y, 0)
        ];
        const rowGeometry = new THREE.BufferGeometry().setFromPoints(rowPoints);
        const rowLine = new THREE.Line(rowGeometry, material);
        group.add(rowLine);
    });
   
    const colPoint = [new THREE.Vector3(width/2, -height/4, 0), new THREE.Vector3(width/2, -height/2, 0)];
    const columnGeo1 = new THREE.BufferGeometry().setFromPoints(colPoint);
    const colLine1 = new THREE.Line(columnGeo1, material);
    group.add(colLine1);


    const colPoint2 = [new THREE.Vector3(width/4, height/4, 0), new THREE.Vector3(width/4, 0, 0)];
    const columnGeo2 = new THREE.BufferGeometry().setFromPoints(colPoint2);
    const colLine2 = new THREE.Line(columnGeo2, material);
    group.add(colLine2);


    const colPoint3 = [new THREE.Vector3(3*width/4, height/4, 0), new THREE.Vector3(3*width/4, 0, 0)];
    const columnGeo3 = new THREE.BufferGeometry().setFromPoints(colPoint3);
    const colLine3 = new THREE.Line(columnGeo3, material);
    group.add(colLine3);
    group.position.set(-2*posWid, posHei/2, 0);

    const result = {
        group: group,
        editableMeshes: []
    };
    return result;
}
