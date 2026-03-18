import * as THREE from 'three';
 
export function createBackSet(originX, originY, width, height, backSetDepth){
    const shape=new THREE.Shape();
    shape.moveTo(originX,originY);
    shape.lineTo(originX,originY+height);
    shape.lineTo(originX+width/3,originY+height);
    shape.lineTo(originX+width/3,originY+3*height/4);
    shape.absarc(originX+width/3,originY+height/2, width/4, Math.PI/2, -Math.PI/2, true);
    shape.lineTo(originX+width/3,originY);
    shape.lineTo(originX,originY);


    const extrudedSettings={
        depth: backSetDepth,
        bevelEnabled:false
    }
 
    // w/6, 7h/24 , w/12
    const holePath = new THREE.Path();
    holePath.absarc(originX + width/6, originY + height/8, width/12, 0, Math.PI * 2);
   
    // w/6, h/24 , w/12
    const holePath2 = new THREE.Path();
    holePath2.absarc(originX + width/6, originY + 7*height/8, width/12, 0, Math.PI * 2);


    shape.holes.push(holePath)
    shape.holes.push(holePath2)
    const geometry= new THREE.ExtrudeGeometry(shape,extrudedSettings);
    const material= new THREE.MeshBasicMaterial({color:'white'});
    const mesh=new THREE.Mesh(geometry,material);


    return {
        mesh, backSetDepth
    };
}
