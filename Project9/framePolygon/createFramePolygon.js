import * as THREE from "three";
import { transformFrameVertex } from "./transformFrameVertices";
import { createMeshWithEdges } from "../createMeshWithEdges";

export function createFramePolygon(rectangularPath, outerProfileShape, material, length, breadth) {
      const outerEdges = rectangularPath.getRectangleEdges(0, 0);
      const frameGroup = new THREE.Group();
      
      // loop each edge and extrude them in that path
      outerEdges.forEach((edge, index) => {
        const eachSideFrameGeometry = new THREE.ExtrudeGeometry(
        outerProfileShape.createFrameOuterShape(0, 0),
        {
          extrudePath: edge,
          bevelEnabled: false
        }
      );

      const framePostionArray = eachSideFrameGeometry.attributes.position.array;

      for (let i = 0; i < framePostionArray.length; i += 3) {
        const x = framePostionArray[i];
        const y = framePostionArray[i + 1];
        const [nx, ny] = transformFrameVertex(x, y, index, length, breadth);
        framePostionArray[i] = nx;
        framePostionArray[i + 1] = ny;
      }

      eachSideFrameGeometry.attributes.position.needsUpdate = true;
      eachSideFrameGeometry.computeVertexNormals();

      // Edges
      const mesh = createMeshWithEdges(eachSideFrameGeometry, material, "outer", index);
      if(index == 2) {
        // mesh.position.z += 50
      }
      frameGroup.add(mesh);
    });

    return frameGroup;
}