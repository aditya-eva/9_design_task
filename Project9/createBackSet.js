import * as THREE from 'three';
 
export function createBackSet(originX, originY, width, height){
 
    const arc=2*width/15;
    const shape=new THREE.Shape();
    shape.moveTo(originX,originY);
    shape.lineTo(originX,originY+height/3);
    shape.lineTo(originX+width/3,originY+height/3);
    shape.lineTo(originX+width/3,originY+height/3-height/12+arc);
    shape.absarc(originX+width/3+arc,originY+height/3-height/12+arc,arc,Math.PI,3*Math.PI/2,false);
    shape.lineTo(originX+width/3+arc,originX+height/3-height/12);
    shape.absarc(originX+width/3+arc,originY+height/6,height/12,Math.PI,3*Math.PI/2,true);
    shape.lineTo(originX+width/3+arc,originY+height/12);
    shape.absarc(originX+width/3+arc,originY+height/12-arc,arc,Math.PI/2,Math.PI,false);
    shape.lineTo(originX+width/3,originY+height/12-arc);
    shape.lineTo(originX+width/3,originY);
    shape.lineTo(originX,originY);
    
    const depth = 5;
    const extrudedSettings={
        depth,
        bevelEnabled:false
    }
 
    // w/6, 7h/24 , w/12
    const holePath = new THREE.Path();
    holePath.absarc(width/6, 7*height/24, width/12, 0, Math.PI * 2);
    
    // w/6, h/24 , w/12
    const holePath2 = new THREE.Path();
    holePath2.absarc(width/6, height/24, width/12, 0, Math.PI * 2);

    shape.holes.push(holePath)
    shape.holes.push(holePath2)
    const geometry= new THREE.ExtrudeGeometry(shape,extrudedSettings);
    const material= new THREE.MeshBasicMaterial({color:'white'});
    const mesh=new THREE.Mesh(geometry,material);

    const screwHeadGeo = new THREE.CylinderGeometry(width/12, width/12, 1, 32);
    const screwMat = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 0.9,
    roughness: 0.3
    });
    const screwRadius = width/12;
    const screwDepth = 1;

    // top screw
    const screw1 = new THREE.Mesh(screwHeadGeo, screwMat);
    screw1.rotation.x = Math.PI/2;
    screw1.position.set(width/6, 7*height/24, depth + screwDepth/2);

    // bottom screw
    const screw2 = screw1.clone();
    screw2.position.set(width/6, height/24, depth + screwDepth/2);

    // cross slots
    const lineSize = screwRadius * 1.2;

    // top screw lines
    const lines1 = createScrewLines(lineSize);
    lines1.rotation.x = -Math.PI/2;
    lines1.position.set(width/6, 7*height/24, depth + screwDepth + 0.02);

    // bottom screw lines
    const lines2 = lines1.clone();
    lines2.position.set(width/6, height/24, depth + screwDepth + 0.02);

    mesh.add(lines1);
    mesh.add(lines2);

    mesh.add(screw1);
    mesh.add(screw2);
    mesh.add(lines1);
    mesh.add(lines2);

    return {
        mesh, depth
    };
}


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