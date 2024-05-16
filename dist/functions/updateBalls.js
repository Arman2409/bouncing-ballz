const updateBalls = (balls, deltaTime) => {
    for (const ball of balls) {
        ball.x += ball.velocity.x * deltaTime;
        ball.y += ball.velocity.y * deltaTime;
    }
};
export default updateBalls;
