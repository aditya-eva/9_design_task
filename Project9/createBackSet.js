import * as THREE from 'three';
 
export function createBackSet(originX, originY, width, height, side){
 
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
 
    const extrudedSettings={
        depth:8,
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

    return mesh;
}