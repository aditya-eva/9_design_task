import * as THREE from "three"
import { adjustBeadVertices } from "./adjustBeadVertices"
import { beadOffset } from "./beadOffset"
import { createMeshWithEdges } from "../createMeshWithEdges";

export function createBeadPolygon(rectangularPath, outerFramePolygon, shapesArray, material, outerH1, beadHeight, length, breadth) {
    
    // Bead Edges
    const beadEdges = rectangularPath.getRectangleEdges(0, 0);
    const beadGroup = new THREE.Group();
    
    // loop each edge and extrude them in that path
    beadEdges.forEach((edge, index) => {
      const type = shapesArray[index].type;
      let shape;
      if(type === "outer") shape = shapesArray[index].createFrameOuterShape(0, 0);
      if(type === "bead") shape = shapesArray[index].createBeadShape(0, 0);
      const eachSideBeadGeometry = new THREE.ExtrudeGeometry(shape,
        {
          extrudePath: edge,
          bevelEnabled: false
        }
      );

      // this is the position array containing all the indices
      const positionArray = eachSideBeadGeometry.attributes.position.array;

      // this function loops all the indeices and fixes the position of each vertex
      adjustBeadVertices(positionArray, index, outerH1, beadHeight, length, breadth);

      eachSideBeadGeometry.attributes.position.needsUpdate = true;
      eachSideBeadGeometry.computeVertexNormals();
    
      // create the mesh and add edge geometry to it
      const mesh = createMeshWithEdges(eachSideBeadGeometry, material, "bead", index);
      beadOffset(mesh, outerFramePolygon, index, outerH1);

      beadGroup.add(mesh);
    })
    return beadGroup;
}