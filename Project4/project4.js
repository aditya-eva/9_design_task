import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);


const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


const material = new THREE.MeshStandardMaterial({
  color: 0x00e5ff,
  metalness: 0.4,
  roughness: 0.2
});


const helper = new THREE.AxesHelper(500);
scene.add(helper);


const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(500, 500, 500);
dirLight.castShadow = true;
scene.add(dirLight);

let dia = 200;
let th1 = 45 * Math.PI/180;
let th2 = 45 * Math.PI/180;
let depth = 500;
validateInputs();
function validateInputs() {
  if (dia <= 0 || depth <= 0) {
    alert("Diameter and depth must be positive. Resetting to defaults.");
    resetDefaults();
    return false;
  }
  if ((th1 >= 89 || th1 <= 0) || th2 >= 89 || th2 <= 0) {
    alert("Angle too close to 90°. Resetting to defaults.");
    resetDefaults();
    return false;
  }
  const projection =
    (dia) * (Math.tan(th1) + Math.tan(th2));

  if (projection > depth) {
    alert("Invalid angle combination. Projections exceed depth. Resetting.");
    resetDefaults();
    return false;
  }
  return true;
}

function resetDefaults() {
  dia = 200;
  depth = 500;
  th1 = Math.PI/4;
  th2 = Math.PI/4;
}

scene.add(new THREE.AmbientLight(0xffffff, 0.3));

const shape = new THREE.Shape();
shape.absarc(0, 0, dia/2, 0, 2*Math.PI, false); 
const extrudeSettings = {
  depth,
  bevelEnabled: false,
  curveSegments: 30
};
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

const pos = geometry.attributes.position;
const arr = pos.array;
for(let i=0;i<arr.length;i+=3) {
  let x = arr[i];
  let y = arr[i+1];
  let z = arr[i+2];
  if(z > depth/2) {
    arr[i+2] = z - y*Math.tan(th1);
  } else {
    arr[i+2] = z + y*Math.tan(th2);
  }
}

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

geometry.center()
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const line = new THREE.LineSegments(edges, lineMaterial);
mesh.add(line);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
camera.position.z = depth * 1.5;
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});