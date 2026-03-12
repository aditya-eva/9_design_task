import * as THREE from "three";

const loader = new THREE.TextureLoader();


export function createMeshWithEdges(geo, material, type, index) {

  let basePath;
  let colorMap;
  let normalMap;
  let roughnessMap;
  let metalnessMap;

  // if(type === "outer") {
    basePath = "chips/GroundWoodChips001_";
    colorMap = loader.load(basePath + "COL_2K.jpg");
    normalMap = loader.load(basePath + "NRM_2K.jpg");
    roughnessMap = loader.load(basePath + "REFL_2K.jpg");
    metalnessMap = loader.load(basePath + "GLOSS_2K.jpg");
  // } 

  // if(type === "bead") {
  //   basePath = "./metal/2K/Poliigon_MetalSteelBrushed_7174_";
  //   colorMap = loader.load(basePath + "BaseColor.jpg");
  //   normalMap = loader.load(basePath + "Normal.png");
  //   roughnessMap = loader.load(basePath + "RoughNess.jpg");
  //   metalnessMap = loader.load(basePath + "metallic.jpg");
  // } 
  
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.repeat.set(0.01, 0.01);
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  
  const texturedMaterial = new THREE.MeshStandardMaterial({
    map: colorMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    metalnessMap: metalnessMap,
    metalness: 0.3,
    roughness: 1
  });

  const edgeGeo = new THREE.EdgesGeometry(geo, 45);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: "black" });
  const lineSeg = new THREE.LineSegments(edgeGeo, edgeMaterial);

  const mesh = new THREE.Mesh(geo, texturedMaterial);

  mesh.add(lineSeg);
  mesh.userData.type = type;
  mesh.userData.id = index;

  return mesh;
}