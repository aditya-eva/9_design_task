import { updateGeometry } from "./updateGeometry";

export function rebuildGeometry(height, width, depth, dia, w1, mesh) {
    const newGeo = updateGeometry(height, width, depth, dia, w1);
    mesh.geometry.dispose();
    mesh.geometry = newGeo;
}