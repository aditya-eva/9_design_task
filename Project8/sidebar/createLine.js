import * as THREE from "three"


export function createLine(p1, p2, p3, p4) {
    const material = new THREE.LineBasicMaterial( { color: "black" } );
    const points = [];
    points.push( new THREE.Vector3( p1, p2, 0 ) );
    points.push( new THREE.Vector3( p3, p4, 0 ) );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    return line;
}
