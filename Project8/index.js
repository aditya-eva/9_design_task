import * as THREE from "three";
import { createWindow } from "./createWindow";
import { createYourNameSection } from "./createYourNameSection";
import { groupShapes } from "./groupShapes";
import { addDashes } from "./addDashes";
import { groupAllFields } from "./sideBar/groupAllFields";
import { FontLoader, OrbitControls, TextGeometry } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color("white");


const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

const width = 100;
const height = 100;
const outerH1 = 6;
const beadHeight = 2;
const loader = new FontLoader();
let font;

loader.load("./fonts/helvetiker_regular.typeface.json",(f)=>{
    font = f;
});

camera.position.z = Math.max(2*width, 2*height);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const drawingBoard = new THREE.Group();

const controls = new OrbitControls(camera, renderer.domElement);
const geometry = new THREE.PlaneGeometry(4*width, 2.1*height);
const material = new THREE.MeshBasicMaterial({
  color: "gray",
  side: THREE.DoubleSide
});


const plane = new THREE.Mesh(geometry, material);
drawingBoard.add(plane);


const windowParts = createWindow(width, height, outerH1, beadHeight, scene);

const nameSection = createYourNameSection(width, height, 3*width/4, 3*height/4);
const groupedShapes = groupShapes(width, height);

const groupFields = groupAllFields(width, 2*height);
drawingBoard.add(groupFields);
drawingBoard.add(windowParts.topSection)
drawingBoard.add(windowParts.leftSection)
drawingBoard.add(windowParts.bottomSection)
drawingBoard.add(windowParts.rightSection)


const dashes = addDashes(width, height);
drawingBoard.add(groupedShapes);
drawingBoard.add(nameSection.group);
drawingBoard.add(dashes.dashedLineVertical);
drawingBoard.add(dashes.dashedLineHorizontal);
scene.add(drawingBoard)


// Handling the change in text
//#region using rayCast to edit the names of the fields
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click",(event)=>{
  const editableMeshes = nameSection.editableMeshes;
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse,camera);
  const intersects = raycaster.intersectObjects(editableMeshes);
  if(intersects.length > 0){
      const mesh = intersects[0].object;
      const input = document.getElementById("nameInput");
      input.style.left = event.clientX + "px";
      input.style.top = event.clientY + "px";
      input.style.display = "block";
      input.value = mesh.userData.text;
      input.focus();
      currentMesh = mesh;
  }
});

let currentMesh = null;
const input = document.getElementById("nameInput");

input.addEventListener("blur",()=>{
  if(!currentMesh) return;
  const newText = input.value;
  const geo = new TextGeometry(newText,{
    font:font,
    size:4,
    depth:1
  });
  geo.center();
  currentMesh.geometry.dispose();
  currentMesh.geometry = geo;
  currentMesh.userData.text = newText;
  input.style.display = "none";
});
//#endregion

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}


animate();