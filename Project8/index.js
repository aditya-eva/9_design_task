import * as THREE from "three";
import { createWindow } from "./createWindow";
import { createYourNameSection } from "./createYourNameSection";
import { groupShapes } from "./groupShapes";
import { addDashes } from "./addDashes";
import { groupAllFields } from "./sideBar/groupAllFields";
import { createDimension } from "./dimensions/createDimension";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

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


camera.position.z = Math.max(2*width, 2*height);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const drawingBoard = new THREE.Group();


const geometry = new THREE.PlaneGeometry(4*width, 2.1*height);
const material = new THREE.MeshBasicMaterial({
  color: "gray",
  side: THREE.DoubleSide
});


const plane = new THREE.Mesh(geometry, material);
drawingBoard.add(plane);


const windowParts = createWindow(width, height, outerH1, beadHeight, scene);
// console.log(windowParts)


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
drawingBoard.add(nameSection);
drawingBoard.add(dashes.dashedLineVertical);
drawingBoard.add(dashes.dashedLineHorizontal);
scene.add(drawingBoard)

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


animate();
