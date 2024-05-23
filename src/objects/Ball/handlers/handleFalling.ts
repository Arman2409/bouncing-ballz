import { dragCoefficient, fallAcceleration } from "../../../configs/physicsConfigs.js";
import type { Ball } from "../Ball.js";

const handleFalling = (ballObj: Ball, delta: number) => {
  const { y, fallHeight, speed, radius } = { ...ballObj }
  // Collapse the ball if it is almost hitting the ground 
  if (y > fallHeight - radius) {
    ballObj.isCollapsing = true;
  }
  // Check if the ball is in the bottom of its trajectory 
  if (y === fallHeight) {
    if (speed < fallAcceleration * 20) {
      return ballObj.stop();
    };
    return ballObj.bounce();
  }
  // Increase ball's speed by considering fall acceleration and drag coefficient.  
  ballObj.speed += fallAcceleration * (1 - dragCoefficient);
  ballObj.y = y + (delta * ballObj.speed);
  if (ballObj.y > fallHeight) ballObj.y = fallHeight
}

export default handleFalling;