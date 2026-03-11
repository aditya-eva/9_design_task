import * as THREE from "three"
import { createDimensionText } from "./createDimensionText";
import { createDimensionLine } from "./createDimensionLine";
import { createDimensionLineVert } from "./createDimensionLineVert"

export function createDimension(startX, endX, y, textValue, font, horizontal) {
    const group = new THREE.Group();
    let line;
    if(horizontal === true) {
        line = createDimensionLine(startX, endX, y);
    } else {
        line = createDimensionLineVert(startX, endX, y);
    }
    const text = createDimensionText(textValue, font);
    if(horizontal === true) {
        text.position.set((startX + endX) / 2 - 5, y + 1, 0);
    } else {
        text.position.set(y + 1, (startX + endX) / 2 + 5, 0);
        text.rotateZ(-Math.PI/2)
    }
    group.add(line);
    group.add(text);
    return group;
}
