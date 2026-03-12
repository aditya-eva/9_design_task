import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { BasicShapes } from "./BasicShapes";
import { ExtrudePath } from "./ExtrudePath";
import { createFramePolygon } from "./framePolygon/createFramePolygon";
import { createBeadPolygon } from "./beadPolygon/createBeadPolygon";
import { highLightGroup } from "./highlightGroup";


// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");


// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = 500;


// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Controls
const controls = new OrbitControls(camera, renderer.domElement);


// Helpers
scene.add(new THREE.AxesHelper(200));


const drawingBoard = new THREE.Group();


// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// Section Parameters
const outerHeight = 40;
const outerWidth = 40;
const outerH1 = 0.4*outerHeight;
const beadHeight = 20;
const beadWidth = 12;


const length = 300;
const breadth = 200;


// Material
const material = new THREE.MeshStandardMaterial({
  color: "cyan",
  side: THREE.DoubleSide,
  metalness: 0.6,
  roughness: 0.6,
  wireframe: false
});


// Extrude Path
const rectangularPath = new ExtrudePath({ length, breadth });


// outer Profile edges 
const outerProfileShape = new BasicShapes({
  outerHeight,
  outerWidth,
  outerH1
});

// outer Polygon
const outerFramePolygon = createFramePolygon(rectangularPath, outerProfileShape, material, length, breadth);
// add outer to the board
outerFramePolygon.position.z += 0              
drawingBoard.add(outerFramePolygon)


// Bead Edges
const beadProfileShape = new BasicShapes({
  beadHeight,
  beadWidth
});
// bead polygon
const beadPolygon = createBeadPolygon(rectangularPath, outerFramePolygon, beadProfileShape, material, outerH1, beadHeight, length, breadth);
beadPolygon.position.z = outerFramePolygon.position.z
// add bead to the board
drawingBoard.add(beadPolygon);

// outerSelected is the material for selected outer mesh (light) and outerGroup is the material for rest all outer meshes (dark)
const outerSelected = new THREE.MeshStandardMaterial({ color: "skyblue" });
const outerGroup = new THREE.MeshStandardMaterial({ color: "blue" });

// beadSelected is the material for selected bead mesh (light) and beadGroup is the material for rest all bead meshes (dark)
const beadSelected = new THREE.MeshStandardMaterial({ color: "skyblue" });
const beadGroup = new THREE.MeshStandardMaterial({ color: "blue" });


// raycaster part 
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


window.addEventListener('dblclick', (event) => {
  // convert the mouse coordinates to -1 to 1 that is conversion of NDC (screen coords -> Normalized device coords)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


  raycaster.setFromCamera(mouse, camera);
 
  // this method returns an array
  const intersectWithObjects = raycaster.intersectObjects(drawingBoard.children);

  if(intersectWithObjects.length === 0) return;

  
  const clickedObject = intersectWithObjects[0].object;
  const clickedObjectType = clickedObject.userData.type;


  highLightGroup(clickedObjectType, clickedObject, drawingBoard, outerGroup, beadGroup, outerSelected, beadSelected);
})

scene.add(drawingBoard);


// Lighting
scene.add(new THREE.AmbientLight("white", 3));


// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}


animate();
