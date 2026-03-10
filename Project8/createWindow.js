import { bottomPart } from "./windowUtils/bottomPart";
import { leftPart } from "./windowUtils/leftPart";
import { rightPart } from "./windowUtils/rightPart";
import { topPart } from "./windowUtils/topPart";


export function createWindow(width, height, outerH1, beadHeight) {
    // function to create the top part
    const topSection = topPart(width, outerH1, beadHeight);
    topSection.position.set(-width/2, height/2)
   
    // function to create the left part
    const leftSection = leftPart(height, outerH1, beadHeight);
    leftSection.position.set(-width/2, -height/2)
   
    // function to create the bottom part
    const bottomSection = bottomPart(width, outerH1, beadHeight);
    bottomSection.position.set(-width/2, -height/2)
   
    // function to create the right part
    const rightSection = rightPart(height, outerH1, beadHeight);
    rightSection.position.set(width/2, -height/2)


    return {
        topSection,
        leftSection,
        bottomSection,
        rightSection
    }
}
