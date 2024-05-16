import updateAndDrawBalls from "./functions/updateAndDrawBalls.js";
import { Ball } from "./objects/Ball.js";
//  Get canvas element
const canvas = document.querySelector("#game_canvas");
const context = canvas.getContext("2d");
// Initialize last time outside the loop
let lastTime = 0;
const balls = [];
const tick = (currentTime) => {
    // Calculate delta time
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    // Update and draw the balls
    updateAndDrawBalls(balls, deltaTime, context);
    // Update lastTime for next frame
    lastTime = currentTime;
    requestAnimationFrame(tick);
};
// Start the game loop
requestAnimationFrame(tick);
// Function to handle user interaction (click event)
canvas.addEventListener('click', (event) => {
    const newBall = new Ball(event.offsetX, // Click position on canvas (X)
    event.offsetY, // Click position on canvas (Y)
    10, 'blue');
    balls.push(newBall);
});
