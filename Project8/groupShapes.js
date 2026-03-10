import * as THREE from "three";
import { createHexagonShape } from "./shapes/createHexagonShape";
import { createStarShape } from "./shapes/createStarShape";
import { createArrow } from "./shapes/createArrow";
import { createLeftDirection } from "./shapes/createLeftDirection";
import { createRightDirection } from "./shapes/createRightDirection";
import { createLine } from "./sideBar/createLine";


export function groupShapes(width, height) {


    const group = new THREE.Group();
    const boxWidth = 220;
    const boxHeight = 42;


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
    const hexagon = createHexagonShape(20);
    const star = createStarShape(10);
    const arrow = createArrow(20);
    const leftDirection = createLeftDirection(20);
    const rightDirection = createRightDirection(20);


    const arr = [hexagon, star, arrow, leftDirection, rightDirection];
    const spacing = 40;


    arr.forEach((shape, index) => {
        shape.position.x = 30 + index * spacing;
        group.add(shape);
    });
    group.position.y = -height;
    group.position.x = -1.8*width;


    const line1 = createLine(51, 0, 51, 42)
    group.add(line1);


    const line2 = createLine(91, 0, 91, 42)
    group.add(line2);


    const line3 = createLine(125, 0, 125, 42)
    group.add(line3);


    const line4 = createLine(170, 0, 170, 42)
    group.add(line4);


    return group;
}
