import { fallAcceleration } from "../../../configs/physicsConfigs.js";
const handleRising = (ballObj, delta, xChange, canvasWidth) => {
    const { x, radius, speed } = { ...ballObj };
    // Check if the ball has reached the peak of its trajectory
    if (speed <= 0) {
        return ballObj.fall();
    }
    ballObj.speed -= fallAcceleration * 2;
    ballObj.y -= (delta * ballObj.speed);
    // Prevent balls from leaving the screen
    if (x >= canvasWidth - radius || x <= radius)
        return;
    ballObj.x = x + xChange;
};
export default handleRising;
