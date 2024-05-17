import { Ball } from "../objects/Ball/Ball.js";

const updateAndDrawBalls = (
  balls: Ball[],
  deltaTime: number,
  context: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number) => {
  for (const ball of balls) {
    ball.update(deltaTime, canvasWidth, canvasHeight)
  }
  for (const ball of balls) {
    ball.draw(context);
  }
};

export default updateAndDrawBalls;