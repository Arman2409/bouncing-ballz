import removeElementFromArray from "../helpers/removeElementFromArray.js";
const updateAndDrawBalls = (balls, ballsToUpdate, context, delta, canvasWidth) => {
    // Declare function that removes a ball from ballsToUpdate
    const removeFromArr = (ballToRemove) => {
        removeElementFromArray(ballsToUpdate, ballToRemove);
    };
    // Update the balls which need to be updated 
    for (const ball of ballsToUpdate) {
        ball.update(delta, canvasWidth, removeFromArr);
    }
    balls.sort((a, b) => {
        if (a.fallHeight < b.fallHeight) {
            return -1;
        }
        return 1;
    });
    //  Draw all the balls
    for (const ball of balls) {
        ball.draw(context);
    }
};
export default updateAndDrawBalls;
