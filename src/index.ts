import { ballsFallDistance, ballRadius, ballBorderColor, ballDecorationColor } from "./configs/ballConfigs.js";
import { maxDelta } from "./configs/updateConfigs.js";
import { circleAnimationDuration, clickCircleSize, mouseRadius } from "./configs/mouseConfigs.js";
import updateAndDrawBalls from "./functions/updateAndDrawBalls.js";
import createPulsingCircle from "./functions/createPulsingCircle.js";
import getRandomColor from "./helpers/getRandomColor.js";
import { Ball } from "./objects/Ball/Ball.js"
import shouldFall from "./physics/shouldFall.js";

if (!document || typeof innerHeight === "undefined"
  || typeof innerWidth === "undefined") {
  throw new Error("Web browser environment is required that provides innerHeight and innerWidth properties.");
}

const canvas = document.querySelector("#game_canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

if (!canvas || !context) {
  throw new Error("HTML Canvas element or its context not provided");
}

adjustCanvasSize();

const balls: Ball[] = [];
const ballsToUpdate: Ball[] = [];

let lastTime = 0;

const tick = (currentTime: number) => {
  const timeDifference = (currentTime - lastTime) / 1000  // Get the difference between last time and current time 
  const delta = timeDifference > maxDelta ? maxDelta : timeDifference; // Check if the delta is somehow over the limit

  updateAndDrawBalls(context, balls, ballsToUpdate, delta, innerWidth);   // Update and draw the balls

  lastTime = currentTime;  // Update lastTime for next frame

  requestAnimationFrame(tick);
}

// Start the game loop
requestAnimationFrame(tick);

let startModal = document.querySelector("#start_modal");
const mouseCont = document.querySelector("#mouse") as HTMLDivElement;

// Function to handle user interaction (click event)
window.addEventListener('click', ({ clientX, clientY }) => {
  // Check if the start info modal is still there and remove it
  if (startModal) {
    document.body.removeChild(startModal);
    startModal = null;
  }

  // Get random ball color 
  const newBallColor = getRandomColor();
  createPulsingCircle(clientX, clientY, clickCircleSize, circleAnimationDuration, newBallColor);

  const newBall = new Ball(
    clientX, // Click position on window (X)
    clientY, // Click position on window (Y)
    ballRadius,
    ballsFallDistance,
    newBallColor,
    ballBorderColor,
    ballDecorationColor,
  );

  balls.push(newBall);

  // Applies gravity to ball 
  const isFalling = shouldFall(newBall, clientY, ballsFallDistance / 2);

  // Check if the ball is falling and add to updating balls
  if (isFalling) {
    ballsToUpdate.push(newBall);
  }
});

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("resize", adjustCanvasSize);

function handleMouseMove({ clientX, clientY }: MouseEvent) {
  if (!mouseCont) {
    console.error("Mouse container not found");
    document.body.style.cursor = "default";
    window.removeEventListener("mousemove", handleMouseMove);
    return;
  }
  // Check if mouse is out of the screen borders and stop moving 
  if (clientX < mouseRadius || clientX > innerWidth - mouseRadius) return;
  if (clientY < mouseRadius || clientY > innerHeight - mouseRadius) return;

  mouseCont.style.top = `${clientY - mouseRadius}px`;
  mouseCont.style.left = `${clientX - mouseRadius}px`;
}

function adjustCanvasSize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}