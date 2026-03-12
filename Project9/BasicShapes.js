import { Shape } from "three";
export class BasicShapes {
    outerHeight;
    outerWidth;
    outerH1;
    beadHeight;
    beadWidth;
    static legWidth = 10;
    static beadRadius = 10;
    static beadThickness = 2;
    constructor({
        type,
        outerHeight,
        outerWidth,
        outerH1,
        beadHeight,
        beadWidth
    }) {
        this.type = type
        this.outerHeight = outerHeight;
        this.outerWidth = outerWidth;
        this.outerH1 = outerH1;
        
        this.beadHeight = beadHeight;
        this.beadWidth = beadWidth;
    }
    createFrameOuterShape(x, y) {
        const shape = new Shape();
        shape.moveTo(x, y);
        shape.lineTo(x + this.outerWidth, y);
        shape.lineTo(x + this.outerWidth, y + this.outerHeight);
        shape.lineTo(x + this.outerWidth - BasicShapes.legWidth, y + this.outerHeight);
        shape.lineTo(x + this.outerWidth - BasicShapes.legWidth, y + this.outerH1);
        shape.lineTo(x, y + this.outerH1);
        shape.lineTo(x, y);
        return shape;
    }
    createBeadShape(x, y) {
        const shape = new Shape();
        shape.moveTo(x, y);
        shape.lineTo(x, y + this.beadHeight - BasicShapes.beadRadius);
        shape.absarc(x + BasicShapes.beadRadius, y + this.beadHeight - BasicShapes.beadRadius, BasicShapes.beadRadius, Math.PI, Math.PI/2, true);
        shape.lineTo(x + this.beadWidth, y + this.beadHeight);
        shape.lineTo(x + this.beadWidth, y + this.beadHeight - BasicShapes.beadThickness);
        shape.lineTo(x + BasicShapes.beadRadius, y + this.beadHeight - BasicShapes.beadThickness);
        shape.absarc(x + BasicShapes.beadRadius, y + this.beadHeight - BasicShapes.beadRadius, BasicShapes.beadRadius - BasicShapes.beadThickness, Math.PI/2, Math.PI);
        shape.lineTo(x + BasicShapes.beadThickness, y);
        shape.lineTo(x, y);
        return shape;
    }
}
