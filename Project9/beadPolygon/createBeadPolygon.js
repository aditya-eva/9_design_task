import * as THREE from "three"
import { adjustBeadVertices } from "./adjustBeadVertices"
import { beadOffset } from "./beadOffset"

export function createBeadPolygon(rectangularPath, beadProfileShape, material, outerH1, beadHeight, length, breadth) {
    
    // Bead Edges
    const beadEdges = rectangularPath.getRectangleEdges(0, 0);
    const group = new THREE.Group();
    
    // loop each edge and extrude them in that path
    beadEdges.forEach((edge, index) => {
      const geo = new THREE.ExtrudeGeometry(beadProfileShape.createBead(0,0),
        {
          extrudePath: edge,
          bevelEnabled: false
        }
      );
      const arr = geo.attributes.position.array;

      adjustBeadVertices(arr, index, outerH1, beadHeight, length, breadth);

      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals();
    
      const edgeGeo = new THREE.EdgesGeometry(geo, 45);
      const edgeMaterial = new THREE.LineBasicMaterial({ color: "red" });
      const lineSeg = new THREE.LineSegments(edgeGeo, edgeMaterial);
      const mesh = new THREE.Mesh(geo, material);

      beadOffset(mesh, index, outerH1);
      
      mesh.add(lineSeg);
      mesh.userData.type = "bead";
      mesh.userData.id = index;
      group.add(mesh);
    })
    return group;
}