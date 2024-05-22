import { dragCoefficient, fallAcceleration } from "../../../configs/physicsConfigs.js";
const handleFalling = (ballObj, delta) => {
    const { y, fallHeight, radius, speed } = { ...ballObj };
    if (ballObj.y > ballObj.fallHeight - ballObj.radius) {
        ballObj.isCollapsing = true;
    }
    // Check if the ball is in the bottom of its trajectory 
    if (y === fallHeight) {
        if (speed < fallAcceleration * 15) {
            return ballObj.stop();
        }
        ;
        return ballObj.bounce();
    }
    ballObj.speed += fallAcceleration * (1 - dragCoefficient);
    ballObj.y = y + (delta * ballObj.speed);
    if (ballObj.y > ballObj.fallHeight)
        ballObj.y = ballObj.fallHeight;
};
export default handleFalling;
