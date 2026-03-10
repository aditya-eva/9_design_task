import * as THREE from "three";
import { createWindow } from "./createWindow";
import { createYourNameSection } from "./createYourNameSection";
import { groupShapes } from "./groupShapes";
import { addDashes } from "./addDashes";
import { groupAllFields } from "./sideBar/groupAllFields";
import { FontLoader, OrbitControls, TextGeometry } from "three/examples/jsm/Addons.js";
import { positionFieldInputs, positionProfileInputs } from "./helper";

const date = document.getElementById("date");
const currDate = new Date();
const formattedDate = currDate.toLocaleDateString('en-GB');
date.value = formattedDate;

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

camera.position.z = Math.max(2 * width, 2 * height);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); 
const drawingBoard = new THREE.Group();

const controls = new OrbitControls(camera, renderer.domElement);
const geometry = new THREE.PlaneGeometry(4 * width, 2 * height);
const material = new THREE.MeshBasicMaterial({
  color: "white",
  side: THREE.DoubleSide
});

const size = 10000;
const divisions = 2000;
const gridHelper = new THREE.GridHelper(size, divisions, new THREE.Color("blue"), new THREE.Color("blue"));

gridHelper.rotateX(Math.PI / 2);
gridHelper.position.z = -1;
// scene.add(gridHelper);

const edge = new THREE.EdgesGeometry(geometry, 60);
const LineMat = new THREE.LineBasicMaterial({ color: "black" })
const lineSegments = new THREE.Line(edge, LineMat);
// drawingBoard.add(lineSegments);

const plane = new THREE.Mesh(geometry, material);
drawingBoard.add(plane);

const windH = 100;
const windW = 300;
const windowParts = createWindow(width, height, outerH1, beadHeight, scene);

const nameSection = createYourNameSection(width, height, 3 * width / 4, 3 * height / 4);
const groupedShapes = groupShapes(width, height);

const groupFields = groupAllFields(width, 2 * height);
drawingBoard.add(groupFields.group);
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

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  positionProfileInputs(
    height,
    width,
    nameSection.group.position.x,
    nameSection.group.position.y,
    camera,
    renderer
  );
  positionFieldInputs(
    width,
    2 * height,
    groupFields.group.position.x,
    groupFields.group.position.y,
    camera,
    renderer
  );
  controls.update();
}


animate();