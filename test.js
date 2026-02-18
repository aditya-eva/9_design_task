import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
let camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
window.addEventListener("keydown", (e) => {
  if(e.key == 'p') {
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
  }
   if(e.key == 'o'){
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 6;
    camera = new THREE.OrthographicCamera(
        -frustumSize * aspect / 2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        -frustumSize / 2,
        0.1,
        100
    )
  }
  camera.position.set(4, 4, 6);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
});

camera.position.set(4, 4, 6);
camera.lookAt(0, 0, 0);
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: "brown" })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2;
floor.receiveShadow = true;
scene.add(floor);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

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

// console.log(geometry);
window.addEventListener('keydown', (e) => {
    if(e.key == "2") {
        // geometry = new THREE.CapsuleGeometry(2, 3);
        // console.log(mesh);
        // console.log(geometry);
        mesh.geometry = new THREE.CapsuleGeometry(1, 2);
        mesh.material = new THREE.MeshDepthMaterial({
            transparent: true,
            opacity: 0.59
        })
    }
    else if(e.key == "3") { 
        mesh.geometry = new THREE.ConeGeometry(1, 2, 32, 32, true);
        mesh.material = material
    }
    else if(e.key == "4") {
        mesh.geometry = new THREE.CylinderGeometry(1, 1.3, 2);
    }
    else if(e.key == "5") {
        let geometry = new THREE.ConeGeometry(1,2);
        let edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges);
        scene.add(line);
    }
    else if(e.key == "6") {
        const arcShape = new THREE.Shape()
            .moveTo(1, 3)
            .absarc( 1, 1.5, 1.8, 0, Math.PI , false );
        mesh.geometry = new THREE.ShapeGeometry( arcShape );
    }
    else if(e.key == "7") {
        mesh.geometry = new THREE.TorusGeometry(1, 1, 12, 48, 4.155);
    }
    else if(e.key == "8") {
        mesh.geometry = new THREE.TubeGeometry();
    }
    else if(e.key == "9") {
        let buffGeo = new THREE.BufferGeometry();
        const count = 40;
        const array = new Float32Array(count*4*3);
        for(let i=0;i<array.length;i++) {
            array[i] = Math.random()
        }
        const positionAttribute = new THREE.BufferAttribute(array, 3);
        buffGeo.setAttribute("position", positionAttribute);
        mesh.geometry = buffGeo;
    }
}) 

 
const mesh = new THREE.Mesh(geometry, material);
// console.log(mesh);
// console.log(edges);
// console.log(line);
// if(scene?.children?.includes(line)) {
//     scene.add(line);
// }else {
//     scene.add(mesh);
// }

scene.add(mesh);
console.log(scene);
mesh.castShadow = true;
mesh.receiveShadow = true;


const ambientLight = new THREE.AmbientLight(0xffffff, 0.3) 
scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight("white", 0.8);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);


const pointLight = new THREE.PointLight(0xffffff, 0.5, 50);
pointLight.position.set(0, 2, 0);
pointLight.castShadow = true;
scene.add(pointLight);


const spotLight = new THREE.SpotLight("white", 2);
spotLight.position.set(1, 2, 2);
spotLight.angle = Math.PI / 6;
spotLight.castShadow = true;
scene.add(spotLight);

const dirHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(dirHelper);
const pointHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointHelper);
const spotHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotHelper);

const controls = new OrbitControls(camera, renderer.domElement);


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