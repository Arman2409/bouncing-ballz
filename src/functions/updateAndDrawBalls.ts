import removeElementFromArray from "../helpers/removeElementFromArray.js";
import type { Ball } from "../objects/Ball/Ball.js";

const updateAndDrawBalls = (
  balls: Ball[],
  ballsToUpdate: Ball[],
  context: CanvasRenderingContext2D,
  deltaTime: number,
  ) => {

  // Declare function that removes a ball from ballsToUpdate
  const removeFromArr = (ballToRemove: Ball) => {
    removeElementFromArray(ballsToUpdate, ballToRemove);
  }

  // Update the balls which need to be updated 
  for (const ball of ballsToUpdate) {
    ball.update(deltaTime, removeFromArr)
  }

  balls.sort((a, b) => {
    if (a.fallHeight < b.fallHeight) {
      return -1
    }
    return 1;
  });

  //  Draw all the balls
  for (const ball of balls) {
    ball.draw(context);
  }
};

export default updateAndDrawBalls;