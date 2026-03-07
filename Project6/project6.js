
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    sp;
    ep;
    constructor(sp, ep) {
        this.sp = sp;
        this.ep = ep;
    }
    getLineEquation() {
        let x1 = this.sp.x;
        let y1 = this.sp.y;
        let x2 = this.ep.x;
        let y2 = this.ep.y;
        let slope = (y2-y1)/(x2-x1);
        console.log(`Equation of line is : y = ${slope}x+${slope*x1 + y1}`);
    }
    getXForY(y) {
        let x1 = this.sp.x;
        let y1 = this.sp.y;
        let x2 = this.ep.x;
        let y2 = this.ep.y;
        let slope = (y2-y1)/(x2-x1);
        return ((y-y1)/slope) + x1;
    }
    getYForX(x) {
        let x1 = this.sp.x;
        let y1 = this.sp.y;
        let x2 = this.ep.x;
        let y2 = this.ep.y;
        let slope = (y2-y1)/(x2-x1);
        return (slope*(x-x1)) + y1;
    }
    findIntersectionPoint(x) {
        let x1 = this.sp.x;
        let y1 = this.sp.y;
        let x2 = this.ep.x;
        let y2 = this.ep.y;
        let slope = (y2-y1)/(x2-x1);
        return slope*(x-x1) + y1;
    }
}

class ExtrudeData {
    edge1;
    edge2;
    constructor(edge1, edge2) {
        this.edge1 = edge1;
        this.edge2 = edge2;
    }
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1e1e1e);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  10000000
);
camera.position.z = 600;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(400, 400, 400);
scene.add(dirLight);
// scene.add(new THREE.AxesHelper(500));

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let length = 300;
let height = 100;
let depth  = 250;

let w1 = 40;
let w2 = 30;
let h1 = 40;

const shape = createRectangleShape(length, height);
let geometry = createExtrudedGeometry(shape, depth);
geometry = cutGeometry(geometry, w1);
geometry = cutGeometryRight(geometry, w2, h1);

const material = new THREE.MeshStandardMaterial({
  color: 0x8B4513,
  roughness: 0.6,
  metalness: 0.2,
  side: THREE.DoubleSide,
  wireframe: !true
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
scene.add(new THREE.AxesHelper(300))

const edgeGeo = new THREE.EdgesGeometry(geometry);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x8B4513 });
const edgeLines = new THREE.LineSegments(edgeGeo, edgeMaterial);
mesh.add(edgeLines);

function createRectangleShape(length, height) {
    return createSegmentedShape(length, height, 60);
}

function createSegmentedShape(width, height, segments) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    for (let i = 1; i <= segments; i++) {
      shape.lineTo((i / segments) * width, 0);
    }
    for (let i = 1; i <= segments; i++) {
      shape.lineTo(width, (i / segments) * height);
    }
    for (let i = segments - 1; i >= 0; i--) {
      shape.lineTo((i / segments) * width, height);
    }
    for (let i = segments - 1; i >= 0; i--) {
      shape.lineTo(0, (i / segments) * height);
    }
    return shape;
}

function createExtrudedGeometry(shape, depth) {
  return new THREE.ExtrudeGeometry(shape, {
    depth: depth,
    bevelEnabled: false,
  });
}

function cutGeometry(geometry, w1) {
    const line = new Line(new Point(0, 0), new Point(w1, height));
    line.getLineEquation()
    let arr = geometry.attributes.position.array;
    // console.log(arr)
    for(let i=0;i<arr.length;i+=3) {
        let x = arr[i];
        let y = arr[i+1];
        let z = arr[i+2];
        if(x <= w1) {
            arr[i] = line.getXForY(y);
        }
    }
    return geometry;
}

function cutGeometryRight(geometry, w2, h1) {
    const line1 = new Line(new Point(length-40, height), new Point(length + w2, h1));
    const line2 = new Line(new Point(length+w2, h1), new Point(length-20, 0));
    let arr = geometry.attributes.position.array;
    for(let i=0;i<arr.length;i+=3) {
        let x = arr[i];
        let y = arr[i+1];
        let z = arr[i+2];
        let thresholdY = line1.findIntersectionPoint(length);
        if(y == height && x >= length - 40) {
            arr[i] = length - 40
        }
        if(x == length && y >= Math.ceil(thresholdY)){
            arr[i] = line1.getXForY(y);
        }
        if(x == length && y >= h1 && y < Math.ceil(thresholdY)) {
            arr[i] = line1.getXForY(y);
        }
        let thresholdY2 = line2.findIntersectionPoint(length);
        if(x == length && y >= 0 && y <= thresholdY2) {
            arr[i] = line2.getXForY(y);
        }
        if(y == 0 && x >= length - 20) {
            arr[i] = length - 20;
        }
        if(x == length && y > thresholdY2 && y < h1) {
            arr[i] = line2.getXForY(y);
        }
    }
    return geometry;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();