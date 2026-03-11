import * as THREE from "three"


export function createDimensionLineVert(startY, endY, x) {
    const points = [
        new THREE.Vector3(x, startY, 0),
        new THREE.Vector3(x, endY, 0)
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "black" });
    const endPoints1 = [
        new THREE.Vector3(x-5, startY, 0),
        new THREE.Vector3(x+5, startY, 0)
    ]
    const geometry2 = new THREE.BufferGeometry().setFromPoints(endPoints1);
    const endPoints2 = [
        new THREE.Vector3(x-5, endY, 0),
        new THREE.Vector3(x+5, endY, 0)
    ]
    const geometry3 = new THREE.BufferGeometry().setFromPoints(endPoints2);
    const line =  new THREE.Line(geometry, material);
    line.add(new THREE.Line(geometry2, material))
    line.add(new THREE.Line(geometry3, material))
    return line
}
