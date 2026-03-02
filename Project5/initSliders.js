
export function initSliders(mesh, rebuildGeometry) {

    const widthSlider  = document.getElementById("width");
    const heightSlider = document.getElementById("height");
    const depthSlider  = document.getElementById("depth");
    const holeSlider   = document.getElementById("hole");
    const w1Slider     = document.getElementById("w1");

    const widthValue  = document.getElementById("widthValue");
    const heightValue = document.getElementById("heightValue");
    const depthValue  = document.getElementById("depthValue");
    const holeValue   = document.getElementById("holeValue");
    const w1Value     = document.getElementById("w1Value");

    function updateFromSliders() {

        const width  = parseFloat(widthSlider.value);
        const height = parseFloat(heightSlider.value);
        const depth  = parseFloat(depthSlider.value);
        const dia    = parseFloat(holeSlider.value);
        const w1     = parseFloat(w1Slider.value);

        widthValue.textContent  = width;
        heightValue.textContent = height;
        depthValue.textContent  = depth;
        holeValue.textContent   = dia;
        w1Value.textContent     = w1;

        rebuildGeometry(height, width, depth, dia, w1, mesh);
    }

    widthSlider.addEventListener("input", updateFromSliders);
    heightSlider.addEventListener("input", updateFromSliders);
    depthSlider.addEventListener("input", updateFromSliders);
    holeSlider.addEventListener("input", updateFromSliders);
    w1Slider.addEventListener("input", updateFromSliders);
}