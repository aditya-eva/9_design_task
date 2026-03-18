import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { BasicShapes } from "./BasicShapes";
import { ExtrudePath } from "./ExtrudePath";
import { createFramePolygon } from "./framePolygon/createFramePolygon";
import { createBeadPolygon } from "./beadPolygon/createBeadPolygon";
import { highLightGroup } from "./highlightGroup";
import { createGlassForWindow } from "./createGlass";
import { getTexturedMaterial } from "./textures";

function getParams() {
  return {
    windowLength: +document.getElementById("length").value,
    windowWidth: +document.getElementById("breadth").value,

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
    handleDepth: Number(document.getElementById("handleDepth").value),
    backSetDepth: Number(document.getElementById("backSetDepth").value),

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
controls.dampingFactor = 0.05;

const drawingBoard = new THREE.Group();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let globalMaterial;

function buildScene(params){
  let {
    windowLength,
    windowWidth,
    outerWidth,
    outerHeight,
    outerH1,
    beadHeight,
    beadWidth,
    handleDepth,
    backSetDepth,
    handleLength,
    handleWidth,
    side,
    handleSide,
    handlePosition,
    materialMode,
    ghhValue
  } = params;

  outerH1 = 0.4 * outerHeight;

  let GHH = ghhValue;

  if(GHH >= windowWidth) {
    alert(`GHH cannot be greater than ${windowWidth}.`);
    GHH = windowWidth / 2;
  }

  const handleIndex = getHandleIndex(handlePosition);

  // clear scene
  while(drawingBoard.children.length){
    drawingBoard.remove(drawingBoard.children[0]);
  }

  // material
  let material;
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

  globalMaterial = material;

  // Extrude path (still expects length/breadth internally)
  const rectangularPath = new ExtrudePath({
    length: windowLength,
    breadth: windowWidth
  });

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
    windowLength,
    windowWidth,
    handleIndex,
    handleSide,
    handleLength,
    handleWidth,
    side,
    outerH1,
    outerWidth,
    GHH,
    handleDepth,
    backSetDepth
  );

  drawingBoard.add(outerFramePolygon);

  // Bead
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
    windowLength,
    windowWidth
  );

  beadPolygon.position.z = outerFramePolygon.position.z;
  drawingBoard.add(beadPolygon);

  // Glass
  const GHA = 5;
  const GVA = 5;

  const glass = createGlassForWindow(
    windowLength - 2*outerH1 - 2*beadHeight + GHA,
    windowWidth - 2*outerH1 - 2*beadHeight + GVA
  );

  glass.position.x = windowLength / 2;
  glass.position.y = windowWidth / 2;
  glass.position.z = beadPolygon.position.z - beadHeight + 0.1;

  drawingBoard.add(glass);

  // center whole window
  drawingBoard.position.x = -windowLength / 2;
  drawingBoard.position.y = -windowWidth / 2;
}

document.getElementById("update").addEventListener("click", () => {
  const params = getParams();
  buildScene(params);
  localStorage.setItem("windowParams", JSON.stringify(params));
  document.getElementById("status").innerText = "Scene rebuilt ✓";
});

buildScene(getParams());

// Highlight materials
const selectedColor = "#D3D3D3";
const restColors = "#2E2E2E";

const outerSelected = new THREE.MeshStandardMaterial({ color: selectedColor });
const outerGroup = new THREE.MeshStandardMaterial({ color: restColors });

const beadSelected = new THREE.MeshStandardMaterial({ color: selectedColor });
const beadGroup = new THREE.MeshStandardMaterial({ color: restColors });

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('dblclick', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(drawingBoard.children);

  if (intersects.length === 0) {
    drawingBoard.children.forEach(group => {
      group.children.forEach(child => {
        if (child.userData.type === "bead" || child.userData.type === "outer")
          child.material = globalMaterial;
      });
    });
  }

  const clickedObject = intersects[0]?.object;
  if (!clickedObject) return;

  const clickedObjectType = clickedObject.userData.type;

  highLightGroup(
    clickedObjectType,
    clickedObject,
    drawingBoard,
    outerGroup,
    beadGroup,
    outerSelected,
    beadSelected
  );
});

scene.add(drawingBoard);
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Lights
scene.add(new THREE.AmbientLight("white", 3));

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(150, 150, 150);
scene.add(directionalLight);

const pointLight = new THREE.PointLight("white", 60, 50);
scene.add(pointLight);

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();