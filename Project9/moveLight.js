let step = 0;
let direction = 0;

export function moveLight(pointLight, length, breadth, outerHeight) {

  let x = -length/2 + outerHeight;
  let y = breadth/2 - outerHeight;
  let z = -12

  if(direction === 0){ 
    pointLight.position.set(x + step, y, z);
    step = step + 1;
    if(step >= length - outerHeight*2){
      step = 0;
      direction = 1;
    }
  }

  else if(direction === 1){ 
    pointLight.position.set(length/2 - outerHeight, y - step, z);
    step++;

    if(step >= breadth - outerHeight*2){
      step = 0;
      direction = 2;
    }
  }
  
  else if(direction === 2){
    pointLight.position.set(length/2 - outerHeight - step, -breadth/2 + outerHeight, z);
    step++;

    if(step >= length - outerHeight * 2){
      step = 0;
      direction = 3;
    }
  }

  else if(direction === 3){ 
    pointLight.position.set(-length/2 + outerHeight, -breadth/2 + outerHeight + step, z);
    step++;

    if(step >= breadth - outerHeight * 2){
      step = 0;
      direction = 0;
    }
  }
}