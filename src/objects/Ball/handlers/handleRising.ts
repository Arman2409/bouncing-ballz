import { fallAcceleration } from "../../../configs/physicsConfigs.js";
import { Ball } from "../Ball.js";

const handleRising = (ballObj: Ball, delta: number, xChange: number, canvasWidth: number) => {
  const { x, radius, speed } = { ...ballObj };
  // Check if the ball has reached the peak of its trajectory
  if (speed <= 0) {
    return ballObj.fall();
  }
  ballObj.speed -= fallAcceleration * 2;
  ballObj.y -= (delta * ballObj.speed);
  // Prevent balls from leaving the screen
  if (x >= canvasWidth - radius || x <= radius) return;
  ballObj.x = x + xChange;
}

export default handleRising;