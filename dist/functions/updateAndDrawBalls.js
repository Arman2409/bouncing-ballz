import removeObjectFromArray from "../helpers/removeObjectFromArray.js";
const updateAndDrawBalls = (balls, ballsToUpdate, context, delta, canvasWidth) => {
    // Declare function that removes a ball from ballsToUpdate
    const removeFromArr = (ballToRemove) => {
        removeObjectFromArray(ballsToUpdate, ballToRemove);
    };
    // Update the balls which need to be updated 
    for (const ball of ballsToUpdate) {
        ball.update(delta, canvasWidth, removeFromArr);
    }
    // Sort balls by their drawing priority
    balls.sort((a, b) => {
        if (a.fallHeight < b.fallHeight) {
            return -1;
        }
        return 1;
    });
    //  Draw the balls
    for (const ball of balls) {
        ball.draw(context);
    }
};
export default updateAndDrawBalls;
