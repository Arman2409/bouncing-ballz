import removeElementFromArray from "../helpers/removeElementFromArray.js";
import { Ball } from "../objects/Ball/Ball.js";

const updateAndDrawBalls = (
  balls: Ball[],
  ballsToUpdate: Ball[],
  context: CanvasRenderingContext2D,
  deltaTime: number,
  canvasWidth: number,
  canvasHeight: number) => {

  // Declare function that removes a ball from ballsToUpdate
  const removeFromArr = (ballToRemove: Ball) => {
    removeElementFromArray(ballsToUpdate, ballToRemove);
  }
  
  // Update the balls which need to be updated 
  for (const ball of ballsToUpdate) {
    ball.update(deltaTime, canvasWidth, canvasHeight, removeFromArr)
  }

  //  Draw all the balls
  for (const ball of balls) {
    ball.draw(context);
  }
};

export default updateAndDrawBalls;