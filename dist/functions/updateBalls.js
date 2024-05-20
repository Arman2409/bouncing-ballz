const updateBalls = (balls, delta) => {
    for (const ball of balls) {
        ball.x += ball.velocity.x * delta;
        ball.y += ball.velocity.y * delta;
    }
};
export default updateBalls;
