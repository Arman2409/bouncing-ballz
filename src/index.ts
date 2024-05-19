import updateAndDrawBalls from "./functions/updateAndDrawBalls.js";
import { Ball } from "./objects/Ball/Ball.js"

let clickModal = document.querySelector("#start_modal");
const canvas = document.querySelector("#game_canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

if (!canvas) {
  throw new Error("HTML Canvas element not provided");
}

canvas.width = innerWidth;
canvas.height = innerHeight;


// Initialize last time outside the loop
let lastTime = 0;

const balls: Ball[] = [];
const ballsToUpdate: Ball[] = [];

const tick = (currentTime: number) => {
  // Clear the screen
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate delta time
  const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds

  // Update and draw the balls
  updateAndDrawBalls(balls, ballsToUpdate, context, deltaTime, innerWidth);

  // Update lastTime for next frame
  lastTime = currentTime;

  requestAnimationFrame(tick);
}

// Start the game loop
requestAnimationFrame(tick);

// Function to handle user interaction (click event)
window.addEventListener('click', ({ offsetX, offsetY }) => {
  if (clickModal) {
    document.body.removeChild(clickModal);
    clickModal = null;
  }

  const newBall = new Ball(
    offsetX, // Click position on canvas (X)
    offsetY, // Click position on canvas (Y)
    innerHeight
  );
  
  balls.push(newBall);
  ballsToUpdate.push(newBall);
});