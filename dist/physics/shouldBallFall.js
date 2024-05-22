const shouldFall = (ball, y, gap) => {
    if (y < innerHeight - gap) {
        ball.fallHeight = innerHeight - gap;
        return ball.status = "falling";
    }
    ball.fallHeight = innerHeight - gap - (innerHeight - y);
};
export default shouldFall;
