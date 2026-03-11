import * as THREE from "three";
import { createHexagonShape } from "./shapes/createHexagonShape";
import { createStarShape } from "./shapes/createStarShape";
import { createArrow } from "./shapes/createArrow";
import { createLeftDirection } from "./shapes/createLeftDirection";
import { createRightDirection } from "./shapes/createRightDirection";
import { createLine } from "./sidebar/createLine";


export function groupShapes(width, height) {


    const group = new THREE.Group();
    const boxWidth = 2*width;
    const boxHeight = height/4;


    const path = new THREE.Path();
    path.moveTo(0, 0);
    path.lineTo(boxWidth, 0);
    path.lineTo(boxWidth, boxHeight);
    path.lineTo(0, boxHeight);
    path.lineTo(0, 0);


    const points = path.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);


    const material = new THREE.LineBasicMaterial({ color: "black" });


    const border = new THREE.Line(geometry, material);


    group.add(border);
    const hexagon = createHexagonShape(height/10);
    const star = createStarShape(height/20);
    const arrow = createArrow(height/10);
    const leftDirection = createLeftDirection(height/10);
    const rightDirection = createRightDirection(height/10);


    const arr = [hexagon, star, arrow, leftDirection, rightDirection];
    const spacing = height/2.5;

    arr.forEach((shape, index) => {
        shape.position.x = height/5 + index * spacing;
        group.add(shape);
    });

    group.position.y = -height;
    group.position.x = -1.8*width;


    const line1 = createLine(2*height/5, 0, 2*height/5, 1.25*width/5)
    group.add(line1);


    const line2 = createLine(4*height/5, 0, 4*height/5, 1.25*width/5)
    group.add(line2);


    const line3 = createLine(6*height/5, 0, 6*height/5, 1.25*width/5)
    group.add(line3);


    const line4 = createLine(8*height/5, 0, 8*height/5, 1.25*width/5)
    group.add(line4);


    return group;
}
