import * as THREE from 'three';
 
export function createBackSet(originX, originY, width, height, backSetDepth){

    // create the backPlate Shape
    const backPlateShape = new THREE.Shape();
    backPlateShape.moveTo(originX,originY);
    backPlateShape.lineTo(originX,originY+height);
    backPlateShape.lineTo(originX+width/3,originY+height);
    backPlateShape.lineTo(originX+width/3,originY+3*height/4);
    backPlateShape.absarc(originX+width/3,originY+height/2, width/4, Math.PI/2, -Math.PI/2, true);
    backPlateShape.lineTo(originX+width/3,originY);
    backPlateShape.lineTo(originX,originY);

    const extrudedSettings={
        depth: backSetDepth,
        bevelEnabled:false
    }
 
    const topHolePath = new THREE.Path();
    topHolePath.absarc(originX + width/6, originY + height/8, width/12, 0, Math.PI * 2);
   
    const bottomHolePath = new THREE.Path();
    bottomHolePath.absarc(originX + width/6, originY + 7*height/8, width/12, 0, Math.PI * 2);

    backPlateShape.holes.push(topHolePath)
    backPlateShape.holes.push(bottomHolePath)

    const backPlateGeometry = new THREE.ExtrudeGeometry(backPlateShape,extrudedSettings);
    const backPlateMaterial = new THREE.MeshBasicMaterial({color:'white'});
    const mesh = new THREE.Mesh(backPlateGeometry, backPlateMaterial);

    const screwHeadGeo = new THREE.CylinderGeometry(width/12, width/12, 0.5 , 32);
    const screwMat = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 0.9,
    roughness: 0.3
    });
    const screwRadius = width/12;

    // top screw
    const topScrew = new THREE.Mesh(screwHeadGeo, screwMat);
    topScrew.rotation.x = Math.PI/2;
    topScrew.position.set(originX + width/6, originY + height/8, backSetDepth);

    // bottom screw
    const bottomScrew = topScrew.clone();
    bottomScrew.position.set(originX + width/6, originY + 7*height/8, backSetDepth);

    mesh.add(topScrew);
    mesh.add(bottomScrew);
    return {
        mesh, backSetDepth
    };
}

// addon function for the lines on the screw, to be used later

function createScrewLines(size){
    const material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });

    const points1 = [
        new THREE.Vector3(-size/2, 0, 0),
        new THREE.Vector3(size/2, 0, 0)
    ];

    const geo1 = new THREE.BufferGeometry().setFromPoints(points1);

    const line1 = new THREE.Line(geo1, material);

    const group = new THREE.Group();
    group.add(line1);
    const line2 = line1.clone();
    line2.rotateY(Math.PI/2)
    group.add(line2);

    return group;
}