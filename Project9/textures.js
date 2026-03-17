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

    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.repeat.set(0.1, 0.1);
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

// import * as THREE from "three"
// export function getTexturedMaterial() {
//     const loader = new THREE.TextureLoader();


//     const basePath = "chips/GroundWoodChips001_";


//     const colorMap     = loader.load(basePath + "COL_2K.jpg");
//     const normalMap    = loader.load(basePath + "NRM_2K.jpg");
//     const roughnessMap = loader.load(basePath + "REFL_2K.jpg");


//     // Apply repeat & wrap to ALL maps
//     const maps = [colorMap, normalMap, roughnessMap];
//     maps.forEach(map => {
//         map.wrapS = THREE.RepeatWrapping;
//         map.wrapT = THREE.RepeatWrapping;
//         map.repeat.set(0.1, 0.1); // tweak this value to taste
//     });


//     colorMap.colorSpace = THREE.SRGBColorSpace;


//     return new THREE.MeshStandardMaterial({
//         map:          colorMap,
//         normalMap:    normalMap,
//         roughnessMap: roughnessMap,
//         metalness:    0,       // wood is not metallic
//         roughness:    0.9,
//     });
// }
