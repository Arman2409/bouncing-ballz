import updateAndDrawBalls from "./functions/updateAndDrawBalls.js";
import { Ball } from "./objects/Ball/Ball.js";
// Get the canvas element
const canvas = document.querySelector("#game_canvas");
if (!canvas) {
    throw new Error("HTML Canvas element not provided");
}
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");
// Initialize last time outside the loop
let lastTime = 0;
const balls = [];
const ballsToUpdate = [];
const tick = (currentTime) => {
    // Clear the screen
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Calculate delta time
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    // Update and draw the balls
    updateAndDrawBalls(balls, ballsToUpdate, context, deltaTime);
    // Update lastTime for next frame
    lastTime = currentTime;
    requestAnimationFrame(tick);
};
// Start the game loop
requestAnimationFrame(tick);
// Function to handle user interaction (click event)
canvas.addEventListener('click', ({ offsetX, offsetY }) => {
    const newBall = new Ball(offsetX, // Click position on canvas (X)
    offsetY, // Click position on canvas (Y)
    canvas.height);
    balls.push(newBall);
    ballsToUpdate.push(newBall);
});
