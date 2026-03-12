import * as THREE from "three";

export function createFramePolygon(rectangularPath, outerProfileShape, material, length, breadth) {
    const outerEdges = rectangularPath.getRectangleEdges(0, 0);
    const group = new THREE.Group();
    
    // loop each edge and extrude them in that path
    outerEdges.forEach((edge, index) => {
      const geo = new THREE.ExtrudeGeometry(outerProfileShape.createFrameOuterShape(0, 0),
        {
          extrudePath: edge,
          bevelEnabled: false,
        }
      );
      const arr = geo.attributes.position.array;
      
      for (let i = 0; i < arr.length; i += 3) {
        let x = arr[i];
        let y = arr[i + 1];
        let z = arr[i + 2];
       
        if(index == 0) {
          if(x == 0) {
            arr[i] = y
          }
          if(x == length) {
            arr[i] = length - y;
          }
        }
       
        if(index == 1) {
          if(y == 0) {
            arr[i+1] =  length - x;
          }
          if(y == breadth) {
            arr[i+1] = breadth - (length - x);
          }
        }
       
        if(index == 2) {
          if(x == 0) {
            arr[i] = breadth - y;
          }
          if(x == length) {
            arr[i] = length - (breadth - y);
          }
        }
    
    
        if(index == 3) {
          if(y == 0) {
            arr[i+1] = x;
          }
          if(y == breadth) {
            arr[i+1] = breadth - x;
          }
        }
    
    
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