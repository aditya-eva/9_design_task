import * as THREE from "three"

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
      for (let i = 0; i < arr.length; i += 3) {
        let x = arr[i];
        let y = arr[i + 1];
        let z = arr[i + 2];
       
        if(index == 0 || index == 2) {
          if(x == 0) {
            arr[i] = outerH1 + beadHeight
          }
          if(x == length) {
            arr[i] = length - (outerH1 + beadHeight)
          }
        }
    
    
        if(index == 1 || index == 3) {
          if(y == 0) {
            arr[i+1] = outerH1
          }
          if(y == breadth) {
            arr[i+1] = breadth - outerH1
          }
        }
      }
    
      geo.attributes.position.needsUpdate = true;
      geo.computeVertexNormals();
    
    
      const edgeGeo = new THREE.EdgesGeometry(geo, 45);
      const edgeMaterial = new THREE.LineBasicMaterial({ color: "red" });
      const lineSeg = new THREE.LineSegments(edgeGeo, edgeMaterial);
      const mesh = new THREE.Mesh(geo, material);
      if(index == 0) {
        mesh.position.y += outerH1
      }
      if(index == 2) {
        mesh.position.y -= outerH1
      }
      if(index == 1) {
        mesh.position.x -= outerH1
      }
      if(index == 3) {
        mesh.position.x += outerH1
      }
    
    
      mesh.add(lineSeg);
      mesh.userData.type = "bead";
      mesh.userData.id = index;
      group.add(mesh);
    })
    return group;

}