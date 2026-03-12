import * as THREE from "three";
import { transformFrameVertex } from "./transformFrameVertices";

export function createFramePolygon(rectangularPath, outerProfileShape, material, length, breadth) {
      const outerEdges = rectangularPath.getRectangleEdges(0, 0);
      const group = new THREE.Group();
      
      // loop each edge and extrude them in that path
      outerEdges.forEach((edge, index) => {
        const geo = new THREE.ExtrudeGeometry(
        outerProfileShape.createFrameOuterShape(0, 0),
        {
          extrudePath: edge,
          bevelEnabled: false
        }
      );

      const arr = geo.attributes.position.array;

      for (let i = 0; i < arr.length; i += 3) {
        const x = arr[i];
        const y = arr[i + 1];
        const [nx, ny] = transformFrameVertex(x, y, index, length, breadth);
        arr[i] = nx;
        arr[i + 1] = ny;
      }

      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals();

      // Edges
      const edgeGeo = new THREE.EdgesGeometry(geo, 45);
      const edgeMaterial = new THREE.LineBasicMaterial({ color: "red" });
      const lineSeg = new THREE.LineSegments(edgeGeo, edgeMaterial);
    
    
      const mesh = new THREE.Mesh(geo, material);
      mesh.add(lineSeg);
      mesh.userData.type = "outer";
      mesh.userData.id = index;
      group.add(mesh);
      return mesh;
    });

    return group;
}