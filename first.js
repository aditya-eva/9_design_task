import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);


const aspect = window.innerWidth / window.innerHeight;
const size = 150;

const camera = new THREE.OrthographicCamera(
    -size * aspect, 
    size * aspect,  
    size,           
    -size,          
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
    const dia = 2*radius;

    if(num % 2 !== 0) {
        return;
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
    if(length <= 2 * (num/2) * radius || breadth <= 2*(num/2) * radius) {
        alert(`Warning !!! Max Radius of " ${maximum} "is reached.`)
        radius = 10;
        r.value = 10;
    }
    let half = num/2;
    let chunk = (length - (half*dia)) / ((num/2) + 1);
    let oldCoord = chunk + radius;
    while(half != 0) {
        if(oldCoord + radius + chunk > length) return;
        shape.holes.push(createHole(oldCoord, breadth/4, radius));
        let next = (dia + chunk);
        oldCoord += next;
        half--;
    }
    half = num/2;
    chunk = (length - (half*dia)) / ((num/2) + 1);
    oldCoord = chunk + radius;
    while(half != 0) {
        if(oldCoord + radius + chunk > length) return;
        shape.holes.push(createHole(oldCoord, (3*breadth)/4, radius));
        let next = (dia + chunk);
        oldCoord += next;
        half--;
    }
    // shape.holes.push(createHole(3*length/4, breadth/4, radius));
    // shape.holes.push(createHole(length/4, 3*breadth/4, radius));
    // shape.holes.push(createHole(3*length/4, 3*breadth/4, radius));
   
    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: depth,
        bevelEnabled: false
    });
    cuboid.geometry = geometry;
    cuboid.material = material;
    camera.position.set(0, 0, 2*depth);
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
controls.dampingFactor = 0.05


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
