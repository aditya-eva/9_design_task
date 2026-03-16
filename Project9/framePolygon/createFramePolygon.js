import * as THREE from "three";
import { transformFrameVertex } from "./transformFrameVertices";
import { createMeshWithEdges } from "../createMeshWithEdges";
import { createHandle } from "../createHandle";

export function createFramePolygon(rectangularPath, shapesArray, material, length, breadth, handlePosition, handleSide, handleLength, handleWidth, side, outerH1, outerWidth, GHH) {

  const handle = createHandle({
    length: handleLength,
    width: handleWidth,
    depth: 8,
    side,
  });

  const outerEdges = rectangularPath.getRectangleEdges(0, 0);
  const frameGroup = new THREE.Group();

  // loop each edge and extrude them in that path
  outerEdges.forEach((edge, index) => {
    const type = shapesArray[index].type;
    let shape;
    if (type === "outer") shape = shapesArray[index].createFrameOuterShape(0, 0);
    if (type === "bead") shape = shapesArray[index].createBeadShape(0, 0);
    const eachSideFrameGeometry = new THREE.ExtrudeGeometry(
      shape,
      {
        extrudePath: edge,
        bevelEnabled: false
      }
    );

    const framePostionArray = eachSideFrameGeometry.attributes.position.array;

    for (let i = 0; i < framePostionArray.length; i += 3) {
      const x = framePostionArray[i];
      const y = framePostionArray[i + 1];
      const [nx, ny] = transformFrameVertex(
        x,
        y,
        index,
        length,
        breadth
      );
      framePostionArray[i] = nx;
      framePostionArray[i + 1] = ny;
    }

    eachSideFrameGeometry.attributes.position.needsUpdate = true;
    eachSideFrameGeometry.computeVertexNormals();

    // Edges
    const mesh = createMeshWithEdges(eachSideFrameGeometry, material, "outer", index);

    if (index === handlePosition) {
      const zOffset = handleSide === "inside" ? 0 : -outerWidth;
      // ── index 0 : bottom bar ──────────────────────────────────────────────
      if (index === 0) {
        handle.position.x = length/2;
        if (side === "left") handle.position.y = outerH1 - 3*outerH1/4;
        if (side === "right") handle.position.y = outerH1 - outerH1/4;
        handle.position.z = zOffset;
        handle.rotation.set(0, handleSide === "outside" ? Math.PI : 0, Math.PI / 2);
      }

      // ── index 1 : right bar ───────────────────────────────────────────────
      if (index === 1) {
        if(handleSide === "inside") {
          if (side === "left") handle.position.x = length - outerH1 + outerH1 / 4;
          if (side === "right") handle.position.x = length - outerH1 / 8;
        }
        if (handleSide === "outside") {
          if (side === "left") handle.position.x = length - outerH1 + outerH1/4;
          if (side === "right") handle.position.x = length - outerH1;
        }
        // change this line
        // handle.position.x = length - 15;

        handle.position.y = GHH;
        handle.position.z = zOffset;
        handle.rotation.y = handleSide === "outside" ? Math.PI : 0;
      }

      // ── index 2 : top bar ─────────────────────────────────────────────────
      if (index === 2) {
        handle.position.x = length / 2;
        if (side === "left") handle.position.y = breadth - outerH1 + outerH1 / 4;
        if (side === "right") handle.position.y = breadth - outerH1 / 4;
        handle.position.z = zOffset;
        handle.rotation.set(0, handleSide === "outside" ? Math.PI : 0, Math.PI / 2);
      }

      // ── index 3 : left bar ────────────────────────────────────────────────
      if (index === 3) {
        if(handleSide === "inside") {
          if (side === "left") handle.position.x = outerH1 / 6;
          if (side === "right") handle.position.x = outerH1 / 2 + outerH1 / 4;
        }
        if (handleSide === "outside") {
          if (side === "left") handle.position.x = outerH1;
          if (side === "right") handle.position.x = outerH1;
        }
        handle.position.y = GHH;
        handle.position.z = zOffset;
        handle.rotation.y = handleSide === "outside" ? Math.PI : 0;
      }

      mesh.add(handle);
    }

    frameGroup.add(mesh);
  });

  return frameGroup;
}