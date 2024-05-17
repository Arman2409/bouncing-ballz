import updateAndDrawBalls from "./functions/updateAndDrawBalls.js";
import { Ball } from "./objects/Ball/Ball.js"

//  Get canvas element
const canvas = document.querySelector("#game_canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d") as CanvasRenderingContext2D;

 // Initialize last time outside the loop
let lastTime = 0;

const balls:Ball[] = [];

const tick = (currentTime:number) => {
  // Clear the screen
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Calculate delta time
  const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
  
  // Update and draw the balls
  updateAndDrawBalls(balls, deltaTime, context, canvas.width, canvas.height);

  // Update lastTime for next frame
  lastTime = currentTime;

  requestAnimationFrame(tick);
}

// Start the game loop
requestAnimationFrame(tick);

// Function to handle user interaction (click event)
canvas.addEventListener('click', (event) => {
    const newBall = new Ball(
      event.offsetX, // Click position on canvas (X)
      event.offsetY, // Click position on canvas (Y)
    );
    balls.push(newBall);
});