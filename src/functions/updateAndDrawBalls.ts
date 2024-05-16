import { Ball } from "../objects/Ball";

const updateAndDrawBalls = (
  balls: Ball[], 
  deltaTime: number, 
  context: CanvasRenderingContext2D) => {
    for (const ball of balls) {
      ball.x += ball.velocity.x * deltaTime;
      ball.y += ball.velocity.y * deltaTime;
    }
    for (const ball of balls) {
      ball.draw(context);
    }
};

export default updateAndDrawBalls;