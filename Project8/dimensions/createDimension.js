import * as THREE from "three"
import { createDimensionText } from "./createDimensionText";
import { createDimensionLine } from "./createDimensionLine";


export function createDimension(startX, endX, y, textValue, font) {


    const group = new THREE.Group();


    const line = createDimensionLine(startX, endX, y);
    const text = createDimensionText(textValue, font);
    text.position.set((startX + endX) / 2 - 5, y + 5, 0);
    group.add(line);
    group.add(text);
    return group;
}
