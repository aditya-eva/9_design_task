import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

scene.add(new THREE.AxesHelper(500));

const height = 250;
const width = 300;
const depth = 100;
const dia = 10;
const w1 = 30;

const DEFAULTS = {
    height: 200,
    width: 300,
    depth: 100,
    dia: 10,
    w1: 20
};

function updateGeometry(height, width, depth, dia, w1) {
    const r = w1 / 2;
    const bend = w1;

    const h1 = height - r - bend - w1;
    const L1 = width - 2*w1 - 2*bend;

    if (height <= 0 || width <= 0 || depth <= 0 || w1 <= 0 || dia <= 0) {
        alert("All dimensions must be greater than 0.\nResetting to default values.");
        resetSlidersToDefaults();
        return updateGeometry(
            DEFAULTS.height,
            DEFAULTS.width,
            DEFAULTS.depth,
            DEFAULTS.dia,
            DEFAULTS.w1
        );
    }

    if (h1 <= 0) {
        alert(
            "Invalid Height!\n\n" +
            "Minimum Height must be greater than: " + (r + bend + w1).toFixed(2) +
            "\n\nResetting to default values."
        );
        resetSlidersToDefaults();
        return updateGeometry(
            DEFAULTS.height,
            DEFAULTS.width,
            DEFAULTS.depth,
            DEFAULTS.dia,
            DEFAULTS.w1
        );
    }

    if (L1 <= 0) {
        alert(
            "Invalid Width!\n\n" +
            "Minimum Width must be greater than: " + (2*w1 + 2*bend).toFixed(2) +
            "\n\nResetting to default values."
        );
        resetSlidersToDefaults();
        return updateGeometry(
            DEFAULTS.height,
            DEFAULTS.width,
            DEFAULTS.depth,
            DEFAULTS.dia,
            DEFAULTS.w1
        );
    }

    if (dia >= w1) {
        alert(
            "Invalid Hole Diameter!\n\n" +
            "Hole diameter must be smaller than: " + w1 +
            "\n\nResetting to default values."
        );
        resetSlidersToDefaults();
        return updateGeometry(
            DEFAULTS.height,
            DEFAULTS.width,
            DEFAULTS.depth,
            DEFAULTS.dia,
            DEFAULTS.w1
        );
    }

    const shape = new THREE.Shape();

    shape.moveTo(-r, 0);

    shape.absarc(0, 0, r, Math.PI, 0, false);
    shape.lineTo(r, h1);

    shape.absarc(r + bend, h1, bend, Math.PI, Math.PI / 2, true);
    shape.lineTo(r + L1 + bend, h1 + bend);

    shape.absarc(r + L1 + bend, h1, bend, Math.PI / 2, 0, true);
    shape.lineTo(r + L1 + bend + bend, 0);

    const cx = r + L1 + r + 2*bend;

    shape.absarc(cx, 0, r, Math.PI, 0, false);
    shape.lineTo(cx + r , h1);

    shape.absarc(r + L1 + bend, h1, w1 + bend, 0, Math.PI/2);
    shape.lineTo(r + bend, h1 + bend + w1);

    shape.absarc(r + bend, h1, bend + w1, Math.PI/2, Math.PI);

    const hole1 = new THREE.Path();
    hole1.absarc(0, 0, dia/2, 0, Math.PI * 2);
    shape.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absarc(cx, 0, dia/2, 0, Math.PI * 2);
    shape.holes.push(hole2);

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: depth,
        bevelEnabled: false,
        curveSegments: 181
    });

    geometry.computeVertexNormals();
    return geometry;
}

const geometry = updateGeometry(height, width, depth, dia, w1);

const material = new THREE.MeshStandardMaterial({
  color: 0x8B4513,
  roughness: 0.6,
  metalness: 0.5,
  side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
console.log(mesh);

function rebuildGeometry(height, width, depth, dia, w1) {
    const newGeo = updateGeometry(height, width, depth, dia, w1);
    mesh.geometry.dispose();
    mesh.geometry = newGeo;
    mesh.add(edgeLines);
}

const widthSlider = document.getElementById("width");
const heightSlider = document.getElementById("height");
const depthSlider = document.getElementById("depth");
const holeSlider = document.getElementById("hole");
const w1Slider = document.getElementById("w1");

const widthValue = document.getElementById("widthValue");
const heightValue = document.getElementById("heightValue");
const depthValue = document.getElementById("depthValue");
const holeValue = document.getElementById("holeValue");
const w1Value = document.getElementById("w1Value");

function updateFromSliders() {

    const width = parseFloat(widthSlider.value);
    const height = parseFloat(heightSlider.value);
    const depth = parseFloat(depthSlider.value);
    const dia = parseFloat(holeSlider.value);
    const w1 = parseFloat(w1Slider.value);

    widthValue.textContent = width;
    heightValue.textContent = height;
    depthValue.textContent = depth;
    holeValue.textContent = dia;
    w1Value.textContent = w1;

    rebuildGeometry(height, width, depth, dia, w1);
}

widthSlider.addEventListener("input", updateFromSliders);
heightSlider.addEventListener("input", updateFromSliders);
depthSlider.addEventListener("input", updateFromSliders);
holeSlider.addEventListener("input", updateFromSliders);
w1Slider.addEventListener("input", updateFromSliders);

function resetSlidersToDefaults() {

    widthSlider.value  = DEFAULTS.width;
    heightSlider.value = DEFAULTS.height;
    depthSlider.value  = DEFAULTS.depth;
    holeSlider.value   = DEFAULTS.dia;
    w1Slider.value     = DEFAULTS.w1;

    widthValue.textContent  = DEFAULTS.width;
    heightValue.textContent = DEFAULTS.height;
    depthValue.textContent  = DEFAULTS.depth;
    holeValue.textContent   = DEFAULTS.dia;
    w1Value.textContent     = DEFAULTS.w1;
}

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