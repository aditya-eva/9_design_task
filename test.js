import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getCamera, switchCamera } from "./cameras/cameraController";
import { addLights } from "./lights/lights";
import { createFloor } from "./objects/floor";
import { mesh } from "./objects/mesh";
import { edgeLine, setupKeyboard } from "./keyboardController/keyboard";
import { geometries } from "./geometries/geometries";
import { materials } from "./materials/materials";
import { curves } from "./curves/curves";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const sphereGeo = geometries.sphere(0.3);
const material = materials.phong;
const sphere = new THREE.Mesh(sphereGeo, material); 
sphere.visible = false;
scene.add(sphere);
const geometryMap = geometries;
const materialMap = materials;
const curvesMap =  curves;
const geometrySelect = document.getElementById("geometry-select");
const materialSelect = document.getElementById("material-select");
const curvatureSelect = document.getElementById("curvature-select");

let currentCurve = null;
function updateGeometry(type) {
  if (!geometryMap[type]) return;
  currentCurve = null;
  sphere.visible = false;
  mesh.visible = true;
  mesh.geometry.dispose();
  mesh.geometry = geometryMap[type]();
  mesh.rotation.set(0, 0, 0);
  mesh.position.set(0, 0, 0);
}

function updateMaterial(type) {
  if (!materialMap[type]) return;
  currentCurve = null;
  sphere.visible = false;
  mesh.visible = true;
  mesh.material.dispose();
  mesh.material = materialMap[type];
}

function updateCurves(type) {
  if(!curvesMap[type]) return;
  mesh.visible = false;
  currentCurve = curvesMap[type]();
  sphere.visible = true;
}

if (geometrySelect) {
  geometrySelect.addEventListener("change", (e) => {
    updateGeometry(e.target.value);
  });
}

if (materialSelect) {
  materialSelect.addEventListener("change", (e) => {
    updateMaterial(e.target.value);
  });
}

if(curvatureSelect) {
  curvatureSelect.addEventListener("change", (e) => {
    updateCurves(e.target.value);
  });
}

let camera = getCamera();
window.addEventListener("keydown", (e) => {
    camera = switchCamera(e.key, camera);
    controls.object = camera;
});

const floor = createFloor();
scene.add(floor);
scene.add(mesh);

setupKeyboard(scene);

addLights(scene);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  mesh.position.y = Math.sin(elapsedTime) * 0.5;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  if(currentCurve) {
    const t = (elapsedTime * 0.2) % 1;
    const pos = currentCurve.curve.getPoint(t);
    sphere.position.set(pos.x, pos.y, 0);
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();