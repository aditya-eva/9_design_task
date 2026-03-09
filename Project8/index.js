import * as THREE from "three";
import { createWindow } from "./createWindow";
import { createYourNameSection } from "./createYourNameSection";
import { createRightDirection } from "./shapes/createRightDirection";
import { groupShapes } from "./groupShapes";
import { addDashes } from "./addDashes";

const scene = new THREE.Scene();
scene.background = new THREE.Color("white");

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 200;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const W = window.innerWidth;
const H = window.innerHeight;

const geometry = new THREE.PlaneGeometry(W, H);
const material = new THREE.MeshBasicMaterial({
  color: "white",
  side: THREE.DoubleSide
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

const width = 100;
const height = 100;
const outerH1 = 10;
const beadHeight = 4;
createWindow(width, height, outerH1, beadHeight, scene);
const nameSection = createYourNameSection(50, 50);
const groupedShapes = groupShapes();

const dashes = addDashes(width, height);
scene.add(dashes.dashedLineVertical)
scene.add(dashes.dashedLineHorizontal)
scene.add(groupedShapes);
scene.add(nameSection);

// scene.add(new THREE.AxesHelper(100))

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