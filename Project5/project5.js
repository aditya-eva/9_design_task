import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { materials } from "../common/materials/materials";
import { updateGeometry } from "./updateGeometry";
import { DEFAULTS } from "./defaults";
import { initSliders } from "./initSliders";
import { rebuildGeometry } from "./rebuildGeometry";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e1e1e);

const size = 600;
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.OrthographicCamera(
    -size * aspect / 2,
    size * aspect / 2,   
    size / 2,            
    -size / 2,            
    0.1,                 
    1000000
);
camera.position.z = 6000;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0xffffff, 2));

const dirLight = new THREE.DirectionalLight(0xffffff, 4);
dirLight.position.set(400, 400, 400);
scene.add(dirLight);

const geometry = updateGeometry(DEFAULTS.height, DEFAULTS.width, DEFAULTS.depth, DEFAULTS.dia, DEFAULTS.w1);

const material = materials.standard;

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

initSliders(mesh, rebuildGeometry);

window.addEventListener("resize", () => {
  const aspect = window.innerWidth / window.innerHeight;
  camera.left   = -size * aspect / 2;
  camera.right  =  size * aspect / 2;
  camera.top    =  size / 2;
  camera.bottom = -size / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();