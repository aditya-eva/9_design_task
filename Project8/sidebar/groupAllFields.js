import * as THREE from "three"
import { createLine } from "./createLine"
import { FontLoader } from "three/examples/jsm/Addons.js";


export function groupAllFields(width, height) {
    const group = new THREE.Group();
    const path1 = new THREE.Path();
    path1.moveTo(0, 0);
    path1.lineTo(0, height);
    const geometry = new THREE.BufferGeometry().setFromPoints(path1.getPoints());
    const material = new THREE.LineBasicMaterial({ color: "black" });
    const line1 = new THREE.Line(geometry, material);
    group.add(line1);
   
    const path2 = new THREE.Path();
    path2.moveTo(width/2, 0);
    path2.lineTo(width/2, 5*height/10);
    const geometry2 = new THREE.BufferGeometry().setFromPoints(path2.getPoints());
    const line2 = new THREE.Line(geometry2, material);
    group.add(line2)

    // Signature
    const signatureLine = createLine(0, height/10, width/2, height/10);
    group.add(signatureLine);
   
    // Scale Factor
    const scaleFactorLine = createLine(0, 2*height/10, width/2, 2*height/10);
    group.add(scaleFactorLine);
   
    // Design dimension
    const designDimensionLine = createLine(0, 3*height/10, width/2, 3*height/10);
    group.add(designDimensionLine);
   
    // Hardware Details
    const hardwareDetailsLine = createLine(0, 4*height/10 + 4, width, 4*height/10 + 4);
    group.add(hardwareDetailsLine);
   
    // Date Line
    const dateLine = createLine(0, 5*height/10, width/2, 5*height/10);
    group.add(dateLine);
   
    // Empty Line
    const emptyLine = createLine(0, 6*height/10, width, 6*height/10);
    group.add(emptyLine);


    // Design Details Line
    const designDetailsLine = createLine(0, 7*height/10, width, 7*height/10);
    group.add(designDetailsLine);
   
    // lorem Ipsum
    const loremIpsumLine = createLine(0, 8*height/10, width, 8*height/10);
    group.add(loremIpsumLine);


    // orgName
    const orgNameLine = createLine(0, 9*height/10, width, 9*height/10);
    group.add(orgNameLine);


    // line between orgName & Project Id
    const lineBetweenOrgAndProject = createLine(width/2, 9*height/10, width/2, 8*height/10)
    group.add(lineBetweenOrgAndProject)
   
    // middle empty Vertical line
    const middleEmptyLine = createLine(3*width/4, 4*height/10 + 4, 3*width/4, height/10+4)
    group.add(middleEmptyLine)


    // last Bottom line
    const lastEmptyLine = createLine(width/2,height/10 + 4, width, height/10 + 4)
    group.add(lastEmptyLine)
   
    // developer Name Line
    const developerNameLine = createLine(3*width/4, 3*height/10, width, 3*height/10)
    group.add(developerNameLine)
    
    group.position.x = width;
    group.position.y = -(height/2);
    const result = {
            group: group,
            editableMeshes: []
        };
    return result;
}
