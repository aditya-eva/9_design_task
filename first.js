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


const l = document.getElementById("length");
const b = document.getElementById("breadth");
const d = document.getElementById("depth");
const r = document.getElementById("radius");
const n = document.getElementById("noOfHoles");
const len = document.querySelector(".len");
const bread = document.querySelector(".bread");
const dep = document.querySelector(".dep");
const rad = document.querySelector(".rad");


const material = new THREE.MeshPhysicalMaterial({
  color: 0x00e5ff,
  metalness: 0.4,
  roughness: 0.2
});

const cuboid = new THREE.Mesh();
scene.add(cuboid);

const helper = new THREE.AxesHelper(400);
scene.add(helper);

function shapeUpdate() {
    const length = Number(l.value);
    const breadth = Number(b.value);
    const depth = Number(d.value);
    let radius = Number(r.value);
    let num = Number(n.value);

    if(num % 2 !== 0) {
        alert("Give even number of holes! ");
    }

    const maximum = Math.min(length, breadth)*0.25;
    if(radius >= maximum) {
        alert(`Warning !!! Max Radius of " ${maximum} "is reached.`)
        radius = 10;
        r.value = 10;
    }
   
    len.innerText = length;
    bread.innerText = breadth;
    dep.innerText = depth;
    rad.innerText = radius;

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(length, 0);
    shape.lineTo(length, breadth);
    shape.lineTo(0, breadth);
    shape.lineTo(0, 0);

    

    shape.holes.push(createHole(length/4, breadth/4, radius));
    shape.holes.push(createHole(3*length/4, breadth/4, radius));
    shape.holes.push(createHole(length/4, 3*breadth/4, radius));
    shape.holes.push(createHole(3*length/4, 3*breadth/4, radius));
   
    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: depth,
        bevelEnabled: false
    });
    cuboid.geometry = geometry;
    cuboid.material = material;
    camera.position.set(0, breadth, depth*3);
}

shapeUpdate();
function createHole(x, y, radius) {
    const hole = new THREE.Path();
    hole.absarc(x, y, radius, 0, Math.PI * 2, false);
    return hole;
}

l.addEventListener("input", shapeUpdate);
b.addEventListener("input", shapeUpdate);
d.addEventListener("input", shapeUpdate);
r.addEventListener("input", shapeUpdate);
n.addEventListener("input", shapeUpdate);


const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(500, 500, 500);
dirLight.castShadow = true;
scene.add(dirLight);


scene.add(new THREE.AmbientLight(0xffffff, 0.3));


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


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
