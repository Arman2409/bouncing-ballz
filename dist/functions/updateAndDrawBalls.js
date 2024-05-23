import removeObjectFromArray from "../helpers/removeObjectFromArray.js";
import sortBalls from "./helpers/sortBalls.js";
const updateAndDrawBalls = (context, balls, ballsToUpdate, delta, canvasWidth) => {
    context.clearRect(0, 0, innerWidth, innerHeight); // Clear the screen
    // Declare function that removes a ball from ballsToUpdate
    const removeFromArr = (ballToRemove) => {
        removeObjectFromArray(ballsToUpdate, ballToRemove);
    };
    // Update the balls which need to be updated 
    for (const ball of ballsToUpdate) {
        ball.update(delta, canvasWidth, removeFromArr);
    }
    // Sort balls by their drawing priority
    sortBalls(balls);
    //  Draw the balls
    for (const ball of balls) {
        ball.draw(context);
    }
};
export default updateAndDrawBalls;
