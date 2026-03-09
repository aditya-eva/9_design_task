import * as THREE from "three"
export function addDashes(width, height) {
    const vertical_points = [];
    vertical_points.push(new THREE.Vector2(0, height/2))
    vertical_points.push(new THREE.Vector2(0, -height/2))
    const horizontal_points = [];
    horizontal_points.push(new THREE.Vector2(-width/2, 0))
    horizontal_points.push(new THREE.Vector2(width/2, 0))
    const vericalGeo = new THREE.BufferGeometry().setFromPoints(vertical_points);
    const horizontalGeo = new THREE.BufferGeometry().setFromPoints(horizontal_points);
    const material = new THREE.LineDashedMaterial( {
	    color: "black",
	    scale: 1,
	    dashSize: 1,
	    gapSize: 1,
    });
    const dashedLineVertical = new THREE.Line(vericalGeo, material) 
    const dashedLineHorizontal = new THREE.Line(horizontalGeo, material) 
    dashedLineVertical.computeLineDistances();
    dashedLineHorizontal.computeLineDistances();
    return {
        dashedLineVertical,
        dashedLineHorizontal
    }
}