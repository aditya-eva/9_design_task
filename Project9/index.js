import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { BasicShapes } from "./BasicShapes";
import { ExtrudePath } from "./ExtrudePath";
import { createFramePolygon } from "./framePolygon/createFramePolygon";
import { createBeadPolygon } from "./beadPolygon/createBeadPolygon";
import { highLightGroup } from "./highlightGroup";
import { createGlassForWindow } from "./createGlass";
import { getTexturedMaterial } from "./textures";
import { moveLight } from "./moveLight"
import { createHandle2D } from "./createHandle2D"




function getParams() {
  return {
    length: +document.getElementById("length").value,
    breadth: +document.getElementById("breadth").value,


    outerWidth: +document.getElementById("outerWidth").value,
    outerHeight: +document.getElementById("outerHeight").value,
    outerH1: +document.getElementById("outerH1").value,
   
    beadHeight: +document.getElementById("beadHeight").value,
    beadWidth: +document.getElementById("beadWidth").value,
   
    handleLength: +document.getElementById("handleLength").value,
    handleWidth: +document.getElementById("handleWidth").value,
    side: document.getElementById("side").value,
    handleSide: document.getElementById("handleSide").value,
    handlePosition: document.getElementById("handlePosition").value,


    materialMode: document.getElementById("material").value,
    ghhValue: document.getElementById("ghh").value
  };
}

function getHandleIndex(position){
  const map = {
    bottom:0,
    right:1,
    top:2,
    left:3
  };
  return map[position];
}


// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#e6e3e3");


// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = 300;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05


const drawingBoard = new THREE.Group();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


function buildScene(params){
  let {
    length,
    breadth,
    outerWidth,
    outerHeight,
    outerH1,
    beadHeight,
    beadWidth,
    handleLength,
    handleWidth,
    side,
    handleSide,
    handlePosition,
    materialMode,
    ghhValue
  } = params;


  outerH1 = 0.4*outerHeight


  let GHH = ghhValue


  if(GHH >= breadth) {
    alert(`GHH cannot be greater than ${breadth}.`)
    GHH = breadth/2;
  }
 
  const handleIndex = getHandleIndex(handlePosition);
  // remove old geometry
  while(drawingBoard.children.length){
    const obj = drawingBoard.children[0];
    drawingBoard.remove(obj);
  }


  // material selection
  let material = getTexturedMaterial();
  if(materialMode === "wireframe"){
    material = new THREE.MeshStandardMaterial({
      color:"cyan",
      wireframe:true
    });
  }
  else if(materialMode === "metallic"){
    material = new THREE.MeshStandardMaterial({
      color:0x88aacc,
      metalness:0.8,
      roughness:0.2
    });
  }
  else{
    material = getTexturedMaterial();
  }


  // ───────── EXTRUDE PATH ─────────
  const rectangularPath = new ExtrudePath({length,breadth});


  const outerProfileShape = new BasicShapes({
    type:"outer",
    outerHeight,
    outerWidth,
    outerH1
  });


  const outerShapesArray = [
    outerProfileShape,
    outerProfileShape,
    outerProfileShape,
    outerProfileShape
  ];


  const outerFramePolygon = createFramePolygon(
    rectangularPath,
    outerShapesArray,
    material,
    length,
    breadth,
    handleIndex,
    handleSide,
    handleLength,
    handleWidth,
    side,
    outerH1,
    outerWidth,
    GHH
  );


  drawingBoard.add(outerFramePolygon);


  // ───────── BEAD ─────────


  const beadProfileShape = new BasicShapes({
    type:"bead",
    beadHeight,
    beadWidth
  });


  const beadShapeArray = [
    beadProfileShape,
    beadProfileShape,
    beadProfileShape,
    beadProfileShape
  ];


  const beadPolygon = createBeadPolygon(
    rectangularPath,
    outerFramePolygon,
    beadShapeArray,
    material,
    outerH1,
    beadHeight,
    length,
    breadth
  );


  beadPolygon.position.z = outerFramePolygon.position.z;
  drawingBoard.add(beadPolygon);


  // ───────── GLASS ─────────


  const GHA = 5;
  const GVA = 5;


  const glass = createGlassForWindow(
    length - 2*outerH1 - 2*beadHeight + GHA,
    breadth - 2*outerH1 - 2*beadHeight + GVA
  );


  glass.position.x = length/2;
  glass.position.y = breadth/2;
  glass.position.z = beadPolygon.position.z - beadHeight + 0.1;


  drawingBoard.add(glass);


  drawingBoard.position.x = -length/2;
  drawingBoard.position.y = -breadth/2;
}


document
.getElementById("update")
.addEventListener("click", () => {


  const params = getParams();
  buildScene(params);


  localStorage.setItem("windowParams", JSON.stringify(params));


  document.getElementById("status").innerText =
  "Scene rebuilt ✓";
});


buildScene(getParams());


const selectedColor = "#D3D3D3"
const restColors = "#2E2E2E"
// outerSelected is the material for selected outer mesh (light) and outerGroup is the material for rest all outer meshes (dark)
const outerSelected = new THREE.MeshStandardMaterial({ color: selectedColor });
const outerGroup = new THREE.MeshStandardMaterial({ color: restColors });


// beadSelected is the material for selected bead mesh (light) and beadGroup is the material for rest all bead meshes (dark)
const beadSelected = new THREE.MeshStandardMaterial({ color: selectedColor });
const beadGroup = new THREE.MeshStandardMaterial({ color: restColors });


// raycaster part
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('dblclick', (event) => {
  // convert the mouse coordinates to -1 to 1 that is conversion of NDC (screen coords -> Normalized device coords)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  // this method returns an array
  const intersectWithObjects = raycaster.intersectObjects(drawingBoard.children);


  if (intersectWithObjects.length === 0) {
    // handle Here for when clicked on the scene
    drawingBoard.children.forEach((group) => {
      group.children.forEach((child) => {
        
        if (child.userData.type === "bead" || child.userData.type === "outer")
          child.material = material;
      })
    });
    return;
  }
  const clickedObject = intersectWithObjects[0].object;
  const clickedObjectType = clickedObject.userData.type;

  highLightGroup(clickedObjectType, clickedObject, drawingBoard, outerGroup, beadGroup, outerSelected, beadSelected);
})


scene.add(drawingBoard);




renderer.outputColorSpace = THREE.SRGBColorSpace;


// Lighting
scene.add(new THREE.AmbientLight("white", 3));


const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(150, 150, 150);
directionalLight.castShadow = true
scene.add(directionalLight);


const pointLight = new THREE.PointLight("white", 60, 50);
// scene.add(new THREE.PointLightHelper(pointLight, 3, "red"))
scene.add(pointLight)




// Animate
function animate() {
  moveLight(pointLight, length, breadth, outerHeight);
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}




animate();
