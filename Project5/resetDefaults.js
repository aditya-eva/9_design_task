import { DEFAULTS } from "./defaults";


const widthSlider = document.getElementById("width");
const heightSlider = document.getElementById("height");
const depthSlider = document.getElementById("depth");
const holeSlider = document.getElementById("hole");
const w1Slider = document.getElementById("w1");

const widthValue = document.getElementById("widthValue");
const heightValue = document.getElementById("heightValue");
const depthValue = document.getElementById("depthValue");
const holeValue = document.getElementById("holeValue");
const w1Value = document.getElementById("w1Value");

export function resetSlidersToDefaults() {

    widthSlider.value  = DEFAULTS.width;
    heightSlider.value = DEFAULTS.height;
    depthSlider.value  = DEFAULTS.depth;
    holeSlider.value   = DEFAULTS.dia;
    w1Slider.value     = DEFAULTS.w1;

    widthValue.textContent  = DEFAULTS.width;
    heightValue.textContent = DEFAULTS.height;
    depthValue.textContent  = DEFAULTS.depth;
    holeValue.textContent   = DEFAULTS.dia;
    w1Value.textContent     = DEFAULTS.w1;
}
