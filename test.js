import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getCamera, switchCamera } from "./cameras/cameraController";
import { addLights } from "./lights/lights";
import { createFloor } from "./objects/floor";
import { mesh } from "./objects/mesh";
import { setupKeyboard } from "./keyboardController/keyboard";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

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
  let elapsedTime = clock.getElapsedTime();
  mesh.position.y = Math.sin(elapsedTime) * 0.5;
  mesh.rotation.y += 0.01;
  mesh.rotation.x += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();