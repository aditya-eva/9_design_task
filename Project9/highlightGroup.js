export function highLightGroup(type, selectedMesh, drawingBoard, outerGroup, beadGroup, outerSelected, beadSelected) {
  // console.log(drawingBoard.children)

  // this loop colors every part of a type (eg: frame, bead) to a dark color 
  drawingBoard.children.forEach((group) => {
    group.children.forEach((child) => {
      if (child?.userData?.type === type) {
        if (type === "outer") {
          child.material = outerGroup;
        }
        if (type === "bead") {
          child.material = beadGroup;
        }
      }
    })
  });

  // this condition highlights the selected mesh into a light
  if (type === "outer") {
    selectedMesh.material = outerSelected;
  }
  if (type === "bead") {
    selectedMesh.material = beadSelected;
  }
}