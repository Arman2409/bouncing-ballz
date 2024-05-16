const updateAndDrawBalls = (balls, deltaTime, context) => {
    for (const ball of balls) {
        ball.x += ball.velocity.x * deltaTime;
        ball.y += ball.velocity.y * deltaTime;
    }
    for (const ball of balls) {
        ball.draw(context);
    }
};
export default updateAndDrawBalls;
