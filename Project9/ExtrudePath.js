import { LineCurve3, Vector3 } from "three";

export class ExtrudePath {
    length;
    breadth;
    constructor({ length, breadth }) {
        this.length = length;
        this.breadth = breadth;
    }
    getRectangleEdges(originX, originY) {
    const p1  = new Vector3(originX, originY, 0);
    const p2  = new Vector3(originX + this.length, originY, 0);
    const p3  = new Vector3(originX + this.length, originY + this.breadth, 0);
    const p4 = new Vector3(originX, originY + this.breadth, 0);

    return [
        new LineCurve3(p1, p2),
        new LineCurve3(p2, p3),
        new LineCurve3(p3, p4),
        new LineCurve3(p4, p1)
    ]}
}
