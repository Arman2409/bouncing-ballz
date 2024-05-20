import updateAndDrawBalls from "./functions/updateAndDrawBalls.js";
import { Ball } from "./objects/Ball/Ball.js";
let clickModal = document.querySelector("#start_modal");
const canvas = document.querySelector("#game_canvas");
const context = canvas.getContext("2d");
if (!canvas) {
    throw new Error("HTML Canvas element not provided");
}
canvas.width = innerWidth;
canvas.height = innerHeight;
// Initialize last time outside the loop
let lastTime = 0;
const balls = [];
const ballsToUpdate = [];
const tick = (currentTime) => {
    // Clear the screen
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Get the difference between last time and current time 
    const timeDifference = (currentTime - lastTime) / 1000;
    // Check if the delta is somehow over the limit
    const delta = timeDifference > 0.03 ? 0.03 : timeDifference; // Convert to seconds
    // Update and draw the balls
    updateAndDrawBalls(balls, ballsToUpdate, context, delta, innerWidth);
    // Update lastTime for next frame
    lastTime = currentTime;
    requestAnimationFrame(tick);
};
// Start the game loop
requestAnimationFrame(tick);
// Function to handle user interaction (click event)
window.addEventListener('click', ({ offsetX, offsetY }) => {
    if (clickModal) {
        document.body.removeChild(clickModal);
        clickModal = null;
    }
    const newBall = new Ball(offsetX, // Click position on canvas (X)
    offsetY, // Click position on canvas (Y)
    innerHeight);
    balls.push(newBall);
    ballsToUpdate.push(newBall);
});
