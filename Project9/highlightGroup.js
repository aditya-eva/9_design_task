export function highLightGroup(type, selectedMesh, drawingBoard, outerGroup, beadGroup, outerSelected, beadSelected) {
  // console.log(drawingBoard.children)
  drawingBoard.children.forEach((group) => {
    group.children.forEach((child) => {
      if (child.userData.type === type) {
        if (type === "outer") {
          child.material = outerGroup;
        }
        if (type === "bead") {
          child.material = beadGroup;
        }
      }
    })
  });

  // selected mesh highlight
  if (type === "outer") {
    selectedMesh.material = outerSelected;
  }
  if (type === "bead") {
    selectedMesh.material = beadSelected;
  }
}