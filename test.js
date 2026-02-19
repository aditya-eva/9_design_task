import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getCamera, switchCamera } from "./cameras/cameraController";
import { addLights } from "./lights/lights";
import { createFloor } from "./objects/floor";
import { mesh } from "./objects/mesh";
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

const textureLoader = new THREE.TextureLoader();
const color = textureLoader.load('./assets/color.jpg');
const roughness = textureLoader.load('./assets/roughness.jpg');
const normal = textureLoader.load('./assets/normal.jpg');

let geometry = new THREE.BoxGeometry(2, 2, 2);

const material = new THREE.MeshStandardMaterial({
    map: color,
    roughnessMap: roughness,
    normalMap: normal,
    side: THREE.DoubleSide
})

let line;
window.addEventListener('keydown', (e) => {
    if(e.key == "2") {
        // geometry = new THREE.CapsuleGeometry(2, 3);
        // console.log(mesh);
        // console.log(geometry);
        if(!scene.mesh) scene.add(mesh);
        scene.remove(line);
        mesh.geometry = new THREE.CapsuleGeometry(1, 2);
        mesh.material = new THREE.MeshPhongMaterial({
            color: "white",
            shininess: 35,
            map: color,
            normalMap: normal,
            transparent: true
        })
    }
    else if(e.key == "3") { 
        if(!scene.mesh) scene.add(mesh);
        scene.remove(line);
        mesh.geometry = new THREE.ConeGeometry(1, 2, 32, 32, true);
        mesh.material = material
    }
    else if(e.key == "4") {
        if(!scene.mesh) scene.add(mesh);
        scene.remove(line);
        mesh.geometry = new THREE.CylinderGeometry(1, 1.3, 2);
    }
    else if(e.key == "5") {
        scene.remove(mesh);
        let geometry = new THREE.ConeGeometry(1,2);
        let edges = new THREE.EdgesGeometry(geometry);
        line = new THREE.LineSegments(edges);
        scene.add(line);
    }
    else if(e.key == "6") {
        scene.add(mesh)
        scene.remove(line);
        const arcShape = new THREE.Shape()
            .moveTo(1, 3)
            .absarc( 1, 1.5, 1.8, 0, Math.PI , false );
        mesh.geometry = new THREE.ShapeGeometry( arcShape );
    }
    else if(e.key == "7") {
        scene.add(mesh)
        scene.remove(line);
        mesh.geometry = new THREE.TorusGeometry(1, 1, 12, 48, 4.155);
    }
    else if(e.key == "8") {
        scene.add(mesh)
        scene.remove(line);
        mesh.geometry = new THREE.TubeGeometry();
    }
    else if(e.key == "9") {
        if(!scene.mesh) scene.add(mesh);
        scene.remove(line);
        let buffGeo = new THREE.BufferGeometry();
        const count = 40;
        const array = new Float32Array(count*4*3);
        for(let i=0;i<array.length;i++) {
            array[i] = Math.random()
        }
        const positionAttribute = new THREE.BufferAttribute(array, 3);
        buffGeo.setAttribute("position", positionAttribute);
        mesh.geometry = buffGeo;
    }else {
        if(!scene.mesh) scene.add(mesh);
        scene.remove(line);
        mesh.geometry = new THREE.BoxGeometry(2, 2, 2);
    }
}) 
addLights(scene);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
camera.position.set(4, 4, 15);
let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  let elapsedTime = clock.getElapsedTime();
  mesh.position.y = Math.sin(elapsedTime) * 0.5;
  mesh.rotation.y += 0.01;
  mesh.rotation.x += 0.01;
  if(line){
    line.rotation.x = Math.PI/4;
    line.rotation.y += 0.01
    line.position.y = Math.sin(clock.getElapsedTime());
   }
  controls.update();
  renderer.render(scene, camera);
}


animate();