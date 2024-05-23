const sortBalls = (balls) => {
    balls.sort((ball1, ball2) => {
        if (ball1.fallHeight > ball2.fallHeight) {
            return 1;
        }
        if (ball1.fallHeight === ball2.fallHeight) {
            if (ball1.y === ball2.y) {
                return ball1.color.localeCompare(ball2.color);
            }
            if (ball1.y > ball2.y) {
                return 1;
            }
            return -1;
        }
        return -1;
    });
};
export default sortBalls;
