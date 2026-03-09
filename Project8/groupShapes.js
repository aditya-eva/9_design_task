import * as THREE from "three";
import { createHexagonShape } from "./shapes/createHexagonShape"
import { createStarShape } from "./shapes/createStarShape"
import { createArrow } from "./shapes/createArrow"
import { createLeftDirection } from "./shapes/createLeftDirection"
import { createRightDirection } from "./shapes/createRightDirection"

export function groupShapes() {
    const group = new THREE.Group();
    const hexagon = createHexagonShape(20);
    const star = createStarShape(10);
    const arrow = createArrow(20);
    const leftDirection = createLeftDirection(20);
    const rightDirection = createRightDirection(20);
    const arr = [hexagon, star, arrow, leftDirection, rightDirection]
    arr.forEach(shape => group.add(shape));
    return group;
}