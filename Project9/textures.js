import * as THREE from "three";

export function getTexturedMaterial() {
    const loader = new THREE.TextureLoader();
    let basePath;
    let colorMap;
    let normalMap;
    let roughnessMap;
    let metalnessMap;

    basePath = "chips/GroundWoodChips001_";
    colorMap = loader.load(basePath + "COL_2K.jpg");
    normalMap = loader.load(basePath + "NRM_2K.jpg");
    roughnessMap = loader.load(basePath + "REFL_2K.jpg");
    metalnessMap = loader.load(basePath + "GLOSS_2K.jpg");

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
    return texturedMaterial;
}