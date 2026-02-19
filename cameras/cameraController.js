import { perspectiveCamera } from "./perspectiveCamera.js";
import { orthographicCamera } from "./orthographicCamera.js";

let camera = perspectiveCamera();

export function getCamera() {
  return camera;
}

export function switchCamera(type, camera) {
  if (type === "p") {
    camera = perspectiveCamera();
  } else if (type === "o") {
    camera = orthographicCamera();
  }else {
    return camera;
  }

  camera.updateProjectionMatrix();
  return camera;
}
