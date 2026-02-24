import * as THREE from "three";

export const geometries = {
  box: () => {
    return new THREE.BoxGeometry(2, 2, 2);
  },
  sphere: (radius = 1.5) => {
    return new THREE.SphereGeometry(radius, 32, 32)
  },
  plane: () => {
    return new THREE.PlaneGeometry(10, 10);
  }, 
  capsule: () => {
    return new THREE.CapsuleGeometry(1, 2);
  },
  cone: () => {
    return new THREE.ConeGeometry(1, 2, 32);
  },
  cylinder: () => {
    return new THREE.CylinderGeometry(1, 1.3, 2);
  },
  torus: () => {
    return new THREE.TorusGeometry(1, 0.6, 32, 12);
  },
  shapeArc: () => {
    const arcShape = new THREE.Shape()
      .moveTo(1, 3)
      .absarc(1, 1.5, 1.8, 0, Math.PI, false);
    return new THREE.ShapeGeometry(arcShape);
  },
  randomBuffer: () => {
    const buffGeo = new THREE.BufferGeometry();
    const count = 40;
    const array = new Float32Array(count * 4 * 3);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.random();
    }
    const positionAttribute = new THREE.BufferAttribute(array, 3);
    buffGeo.setAttribute("position", positionAttribute);
    return buffGeo;
  },
  tube: () => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 0, 0),
      new THREE.Vector3(-1, 1, 0),
      new THREE.Vector3(1, -1, 0),
      new THREE.Vector3(2, 0, 0),
    ]);
    return new THREE.TubeGeometry(curve, 20, 0.2, 8, false);
  }
};
