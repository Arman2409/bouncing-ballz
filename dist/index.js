import { radiusRange } from "./configs/ballConfigs.js";
import { deltaLimit } from "./configs/updateConfigs.js";
import updateAndDrawBalls from "./functions/updateAndDrawBalls.js";
import fall from "./physics/fall.js";
import { Ball } from "./objects/Ball/Ball.js";
import getRandomNumberInRange from "./objects/Ball/helpers/getRandomNumberInRange.js";
let startModal = document.querySelector("#start_modal");
const canvas = document.querySelector("#game_canvas");
const context = canvas.getContext("2d");
if (!canvas || !context) {
    throw new Error("HTML Canvas element or its context not provided");
}
canvas.width = innerWidth;
canvas.height = innerHeight;
const balls = [];
const ballsToUpdate = [];
let lastTime = 0;
const tick = (currentTime) => {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the screen
    const timeDifference = (currentTime - lastTime) / 1000; // Get the difference between last time and current time 
    const delta = timeDifference > deltaLimit ? deltaLimit : timeDifference; // Check if the delta is somehow over the limit
    updateAndDrawBalls(balls, ballsToUpdate, context, delta, innerWidth); // Update and draw the balls
    lastTime = currentTime; // Update lastTime for next frame
    requestAnimationFrame(tick);
};
// Start the game loop
requestAnimationFrame(tick);
// Function to handle user interaction (click event)
window.addEventListener('click', ({ offsetX, offsetY }) => {
    // Check if the start info modal is still there and delete it
    if (startModal) {
        document.body.removeChild(startModal);
        startModal = null;
    }
    const newBall = new Ball(offsetX, // Click position on window (X)
    offsetY, // Click position on window (Y)
    getRandomNumberInRange(radiusRange[0], radiusRange[1]) // Get random radius 
    );
    balls.push(newBall);
    ballsToUpdate.push(newBall);
    if (offsetY < innerHeight) {
        fall(newBall);
    }
});
