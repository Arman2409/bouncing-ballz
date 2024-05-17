const updateAndDrawBalls = (balls, deltaTime, context, canvasWidth, canvasHeight) => {
    for (const ball of balls) {
        ball.update(deltaTime, canvasWidth, canvasHeight);
    }
    for (const ball of balls) {
        ball.draw(context);
    }
};
export default updateAndDrawBalls;
