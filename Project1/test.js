import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getCamera, switchCamera } from "../common/cameras/cameraController";
import { addLights } from "../common/lights/lights";
import { createFloor } from "./objects/floor";
import { mesh } from "./objects/mesh";
import { setupKeyboard } from "./keyboardController/keyboard";
import { geometries } from "../common/geometries/geometries";
import { materials } from "../common/materials/materials";
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
const floorTextureSelect = document.getElementById("floor-texture-select");

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

function updateMaterialTexture(type) {
  
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

if(floorTextureSelect) {
  floorTextureSelect.addEventListener("change", (e) => {
    updateMaterialTexture(e.target.value);
  })
}

let camera = getCamera();
window.addEventListener("keydown", (e) => {
    camera = switchCamera(e.key, camera);
    controls.object = camera;
});

const loader = new THREE.TextureLoader(); 
const texture = loader.load("Project1/textures/grass/2K/Poliigon_GrassPatchyGround_4585_BaseColor.jpg");
const normal = loader.load("Project1/textures/grass/2K/Poliigon_GrassPatchyGround_4585_Normal.png");
const roughness = loader.load("Project1/textures/grass/2K/Poliigon_GrassPatchyGround_4585_Roughness.jpg");


const floor = createFloor();

window.addEventListener('keydown', (e) => {
  if(e.key.toLowerCase() === "f") {
    if(floor.material) {
      floor.material = new THREE.MeshStandardMaterial({
        map: texture,
        normalMap: normal,
        roughnessMap: roughness
      });
    }
  }
})

scene.add(floor);
scene.add(mesh);

setupKeyboard(scene);

const lights = addLights(scene);
const lightSelect = document.getElementById("light-select");

function updateLights(type) {
  Object.keys(lights).forEach(key => {
    lights[key].visible = false;
  });

  if (type === "all") {
    Object.keys(lights).forEach(key => {
      lights[key].visible = true;
    });
  } else if (lights[type]) {
    lights[type].visible = true;
  }
}

if (lightSelect) {
  lightSelect.addEventListener("change", (e) => {
    updateLights(e.target.value);
  });
}

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