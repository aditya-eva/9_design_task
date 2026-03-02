import * as THREE from "three";
import { DEFAULTS } from "./defaults";
import { resetSlidersToDefaults } from "./resetDefaults";
export function updateGeometry(height, width, depth, dia, w1) {
    const r = w1 / 2;
    const bend = w1;

    const h1 = height - r - bend - w1;
    const L1 = width - 2*w1 - 2*bend;

    if (height <= 0 || width <= 0 || depth <= 0 || w1 <= 0 || dia <= 0) {
        alert("All dimensions must be greater than 0.\nResetting to default values.");
        resetSlidersToDefaults();
        return updateGeometry(
            DEFAULTS.height,
            DEFAULTS.width,
            DEFAULTS.depth,
            DEFAULTS.dia,
            DEFAULTS.w1
        );
    }

    if (h1 <= 0) {
        alert(
            "Invalid Height!\n\n" +
            "Minimum Height must be greater than: " + (r + bend + w1).toFixed(2) +
            "\n\nResetting to default values."
        );
        resetSlidersToDefaults();
        return updateGeometry(
            DEFAULTS.height,
            DEFAULTS.width,
            DEFAULTS.depth,
            DEFAULTS.dia,
            DEFAULTS.w1
        );
    }

    if (L1 <= 0) {
        alert(
            "Invalid Width!\n\n" +
            "Minimum Width must be greater than: " + (2*w1 + 2*bend).toFixed(2) +
            "\n\nResetting to default values."
        );
        resetSlidersToDefaults();
        return updateGeometry(
            DEFAULTS.height,
            DEFAULTS.width,
            DEFAULTS.depth,
            DEFAULTS.dia,
            DEFAULTS.w1
        );
    }

    if (dia >= w1) {
        alert(
            "Invalid Hole Diameter!\n\n" +
            "Hole diameter must be smaller than: " + w1 +
            "\n\nResetting to default values."
        );
        resetSlidersToDefaults();
        return updateGeometry(
            DEFAULTS.height,
            DEFAULTS.width,
            DEFAULTS.depth,
            DEFAULTS.dia,
            DEFAULTS.w1
        );
    }

    const shape = new THREE.Shape();

    shape.moveTo(-r, 0);

    shape.absarc(0, 0, r, Math.PI, 0, false);
    shape.lineTo(r, h1);

    shape.absarc(r + bend, h1, bend, Math.PI, Math.PI / 2, true);
    shape.lineTo(r + L1 + bend, h1 + bend);

    shape.absarc(r + L1 + bend, h1, bend, Math.PI / 2, 0, true);
    shape.lineTo(r + L1 + bend + bend, 0);

    const cx = r + L1 + r + 2*bend;

    shape.absarc(cx, 0, r, Math.PI, 0, false);
    shape.lineTo(cx + r , h1);

    shape.absarc(r + L1 + bend, h1, w1 + bend, 0, Math.PI/2);
    shape.lineTo(r + bend, h1 + bend + w1);

    shape.absarc(r + bend, h1, bend + w1, Math.PI/2, Math.PI);

    const hole1 = new THREE.Path();
    hole1.absarc(0, 0, dia/2, 0, Math.PI * 2);
    shape.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absarc(cx, 0, dia/2, 0, Math.PI * 2);
    shape.holes.push(hole2);

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: depth,
        bevelEnabled: false,
        curveSegments: 181
    });

    geometry.computeVertexNormals();
    return geometry;
}

