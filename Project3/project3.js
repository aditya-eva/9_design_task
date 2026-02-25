import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e1e1e);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(600, 400, 600);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const dirLight = new THREE.DirectionalLight(0xffffff, 4);
dirLight.position.set(0, 200, 300);
scene.add(dirLight);

scene.add(new THREE.AxesHelper(500));

const length = 500;
const height = 200;
const depth  = 500;
let th1 = 60 * Math.PI/180;
let th2 = 45 * Math.PI/180;

const hx = length / 2;  
const hy = height / 2;  
const hz = depth / 2;   
let p = height / Math.tan(th1);
let q = height / Math.tan(th2);
if(p + q >= length) {
  alert("Not Possible");
  th1 = th2 = 45*Math.PI/180;
}
p = height / Math.tan(th1);
q = height / Math.tan(th2);

const vertices = new Float32Array([
  -hx+p, hy,  hz,   
   hx-q, hy,  hz,   
    hx,  -hy,  hz,   
  -hx,  -hy,  hz,  
  -hx+p, hy, -hz,   
   hx-q, hy, -hz,   
    hx,  -hy, -hz,  
  -hx,  -hy, -hz    
]);

const indices = [
  0,1,2,
  0,2,3,
  4,6,5,
  4,7,6,
  0,3,7,
  0,7,4,
  0,4,5,
  0,5,1,
  1,5,6,
  1,6,2,
  3,2,6,
  3,6,7
];

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geometry.setIndex(indices);
geometry.computeVertexNormals();

const material = new THREE.MeshStandardMaterial({
  color: 0x8B4513,
  roughness: 0.6,
  metalness: 0.2,
  side: THREE.DoubleSide
});

const edges = new THREE.EdgesGeometry(geometry);
const edgeMaterial = new THREE.LineBasicMaterial({
  color: 0x000000,  
  linewidth: 1
});
const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
scene.add(edgeLines);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();