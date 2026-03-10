import * as THREE from "three";

function worldToScreen(position, camera, renderer){

    const vector = position.clone().project(camera);

    const x = (vector.x + 1) / 2 * renderer.domElement.clientWidth;
    const y = (-vector.y + 1) / 2 * renderer.domElement.clientHeight;

    return {x,y};
}

export function positionProfileInputs(profileH, profileW, groupX, groupY, camera, renderer){

    const nameInput = document.getElementById("nameInput");
    const empInput = document.getElementById("empInput");
    const designationInput = document.getElementById("designationInput");

    const nameWorld = new THREE.Vector3(
        groupX + profileW/2 - profileW/8,
        groupY + profileH/4 + profileH/16,
        0
    );

    const empWorld = new THREE.Vector3(
        groupX + profileW/2 - profileW/8,
        groupY + profileH/8,
        0
    );

    const desWorld = new THREE.Vector3(
        groupX - profileW/16,
        groupY - profileH/4 + profileH/5,
        0
    );

    const namePos = worldToScreen(nameWorld, camera, renderer);
    const empPos = worldToScreen(empWorld, camera, renderer);
    const desPos = worldToScreen(desWorld, camera, renderer);

    nameInput.style.left = namePos.x - profileW/2 + "px";
    nameInput.style.top  = namePos.y + "px";
    nameInput.style.width = profileW + "px";

    empInput.style.left = empPos.x - profileW/2 + "px";
    empInput.style.top  = empPos.y + "px";
    empInput.style.width = profileW + "px";

    designationInput.style.left = desPos.x + "px";
    designationInput.style.top  = desPos.y + "px";
}

export function positionFieldInputs(width, height, groupX, groupY, camera, renderer){
    const dateInput = document.getElementById("date");
    const devInput = document.getElementById("developerName");
    const hardwareInput = document.getElementById("hardwareDetails");
    const dimInput = document.getElementById("designDimension");
    const scaleInput = document.getElementById("scaleFactor");
    const signInput = document.getElementById("signature");

    const signWorld = new THREE.Vector3(
        groupX - width/9,
        groupY + height/11,
        0
    );
    const scaleWorld = new THREE.Vector3(
        groupX - width/11,
        groupY + 3.8*height/20,
        0
    );

    const dimInputWorld = new THREE.Vector3(
        groupX - width/20,
        groupY + 5.8*height/20,
        0
    );

    const hardWareDetailsWorld = new THREE.Vector3(
        groupX - width/18,
        groupY + 8.1*height/20,
        0
    );

    const dateWorld = new THREE.Vector3(
        groupX - width/10,
        groupY + 9.8*height/20,
        0
    );
    const devInputWorld = new THREE.Vector3(
        groupX + 3*width/4 - width/16,
        groupY + 8.1*height/20,
        0
    );
    const signPos = worldToScreen(signWorld, camera, renderer);
    const scalePos = worldToScreen(scaleWorld, camera, renderer);
    const dimInputPos = worldToScreen(dimInputWorld, camera, renderer);
    const hardWarePos = worldToScreen(hardWareDetailsWorld, camera, renderer);
    const datePos = worldToScreen(dateWorld, camera, renderer);
    const devInputPos = worldToScreen(devInputWorld, camera, renderer);

    // signature Field
    signInput.style.left = signPos.x + "px";
    signInput.style.top  = signPos.y + "px";
    // signInput.style.width = width + "px";
    
    // scale Factor Field
    scaleInput.style.left = scalePos.x + "px";
    scaleInput.style.top  = scalePos.y + "px";
    // scaleInput.style.width = width + "px";
    
    // design Dimension Fiels
    dimInput.style.left = dimInputPos.x + "px";
    dimInput.style.top  = dimInputPos.y + "px";
    // dimInput.style.width = width + "px";
    
    // hardware input field
    hardwareInput.style.left = hardWarePos.x + "px";
    hardwareInput.style.top  = hardWarePos.y + "px";
    // hardwareInput.style.width = width + "px";
    
    // date Field
    dateInput.style.left = datePos.x + "px";
    dateInput.style.top  = datePos.y + "px";
    // dateInput.style.width = width + "px";
    
    // devInput Field
    devInput.style.left = devInputPos.x + "px";
    devInput.style.top  = devInputPos.y + "px";
    // devInput.style.width = width + "px";

    const orgInput = document.getElementById("orgName");
    const projectInput = document.getElementById("projectId");
    const descInput = document.getElementById("description");
    const designDetailsInput = document.getElementById("designDetails");
    const desName = document.getElementById("designName")
    
    const designDetailsWorld = new THREE.Vector3(
        groupX - width/13,
        groupY + 13.8*height/20,
    );
    const desrWorld = new THREE.Vector3(
        groupX - width/20,
        groupY + 3*height/4,
    );
    const projWorld = new THREE.Vector3(
        groupX - width/9,
        groupY + 17.8*height/20,
    );
    const orgWorld = new THREE.Vector3(
        groupX + width/2.5,
        groupY + 17.8*height/20,
    );
    const desNameWorld = new THREE.Vector3(
        groupX - 2*width/24,
        groupY + 0.99*height,
    );

    const designDetailsPos = worldToScreen(designDetailsWorld, camera, renderer);
    const descPos = worldToScreen(desrWorld, camera, renderer);
    const projPos = worldToScreen(projWorld, camera, renderer);
    const orgPos = worldToScreen(orgWorld, camera, renderer);
    const desNamePos = worldToScreen(desNameWorld, camera, renderer);
    
    // design Details Input
    designDetailsInput.style.left = designDetailsPos.x + "px";
    designDetailsInput.style.top  = designDetailsPos.y + "px";
    // designDetailsInput.style.width = width + "px";
    
    // desc Details field
    descInput.style.left = descPos.x + "px";
    descInput.style.top  = descPos.y + "px";
    // descInput.style.width = width + "px";

    // project ID field
    projectInput.style.left = projPos.x + "px";
    projectInput.style.top  = projPos.y + "px";
    // projectInput.style.width = width + "px";

    // orgId Field
    orgInput.style.left = orgPos.x + "px";
    orgInput.style.top  = orgPos.y + "px";
    // orgInput.style.width = width + "px";

    // desName Field
    desName.style.left = desNamePos.x + "px";
    desName.style.top  = desNamePos.y + "px";
    // desName.style.width = width + "px";
}