import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e1e1e);
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 800;

const camera = new THREE.OrthographicCamera(
  -frustumSize * aspect / 2, 
   frustumSize * aspect / 2,  
   frustumSize / 2,           
  -frustumSize / 2,           
   1,                         
   2000                       
);

const PARAMS = {
  h: 450,
  bigHole: 40,
  smallHole: 20,
  plateDepth: 80
};

camera.position.z = 850;
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(300, 500, 300);
scene.add(directional);

scene.add(new THREE.AxesHelper(500))

const controls = new OrbitControls( camera, renderer.domElement );
const cuboid = createMain();
const top = createTop();
const bottom = createBottom();
cuboid.add(top)
cuboid.add(bottom)
scene.add(cuboid);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

function createMain() {
    const h = PARAMS.h;
    const w = h/4;
    const wdash = w-10;

    const shape = new THREE.Shape();
    shape.moveTo(w, 0);
    shape.absarc(w, 0, w, -Math.PI/2, -Math.PI, true);
    shape.lineTo(10, 0)
    shape.lineTo(10, 3*h/4);
    shape.lineTo(10+wdash/2, h/2);
    shape.lineTo(w, 3*h/4);
    shape.lineTo(w, 0);
    shape.lineTo(w, -w);

    const hole1 = new THREE.Path();
    hole1.absarc(10 + wdash/2, -h/8, PARAMS.bigHole/2, 0, Math.PI*2);
    shape.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absarc(10 + wdash/4, 3*h/8, PARAMS.smallHole/2, 0, Math.PI*2);
    shape.holes.push(hole2);

    const hole3 = new THREE.Path();
    hole3.absarc(10 + 3*wdash/4, 3*h/8, PARAMS.smallHole/2, 0, Math.PI*2);
    shape.holes.push(hole3);

    const extrudeSettings = {
        depth: PARAMS.plateDepth,
        bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({
        color: "yellow",
        roughness: 0.1,
        metalness: 0.2
    })
    const cuboid = new THREE.Mesh(geometry, material);
    return cuboid;
}

function createTop() {
    const h = PARAMS.h;
    const w = h/4;
    const wdash = w-10;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0)
    shape.lineTo(wdash, 0);
    shape.lineTo(wdash, h/10);
    shape.lineTo(0, h/10);

    const hole1 = new THREE.Path();
    hole1.absarc(wdash/4, h/20, PARAMS.smallHole/2, 0, Math.PI*2);
    shape.holes.push(hole1);

    const hole2 = new THREE.Path();
    hole2.absarc(3*wdash/4, h/20, PARAMS.smallHole/2, 0, Math.PI*2);
    shape.holes.push(hole2);

    const extrudeSettings = {
        depth: PARAMS.plateDepth,
        bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshPhysicalMaterial({
        color: "black",
        roughness: 0.1,
        metalness: 0.2
    })
    const cuboid = new THREE.Mesh(geometry, material);
    cuboid.position.set(10, 3*h/8-h/20, PARAMS.plateDepth);
    return cuboid;
}

function createBottom() {
    const h = PARAMS.h;
    const w = h/4;
    const shape = new THREE.Shape();
    shape.moveTo(w, 0);
    shape.absarc(w, 0, w+5, -5*Math.PI/8, -7*Math.PI/8, true);
    shape.lineTo(1.15*w, 5*h/16);
    shape.lineTo(w, 3*h/8);
    shape.lineTo(2*w, 5*h/16);

    const hole1 = new THREE.Path();
    hole1.absarc(w/2, -h/8, PARAMS.bigHole/2, 0, Math.PI*2);
    shape.holes.push(hole1);

    const extrudeSettings = {
        depth: PARAMS.plateDepth,
        bevelEnabled: false
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({
        color: "red",
        roughness: 0.1,
        metalness: 0.2,
        wireframe: !true
    })
    const cuboid = new THREE.Mesh(geometry, material);
    cuboid.position.z = PARAMS.plateDepth;
    cuboid.position.y = 0
    cuboid.position.x = 5
    return cuboid;
}