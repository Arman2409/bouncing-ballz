import removeElementFromArray from "../helpers/removeElementFromArray.js";
const updateAndDrawBalls = (balls, ballsToUpdate, context, deltaTime, canvasWidth, canvasHeight) => {
    // Declare function that removes a ball from ballsToUpdate
    const removeFromArr = (ballToRemove) => {
        removeElementFromArray(ballsToUpdate, ballToRemove);
    };
    // Update the balls which need to be updated 
    for (const ball of ballsToUpdate) {
        ball.update(deltaTime, canvasWidth, canvasHeight, removeFromArr);
    }
    //  Draw all the balls
    for (const ball of balls) {
        ball.draw(context);
    }
};
export default updateAndDrawBalls;
