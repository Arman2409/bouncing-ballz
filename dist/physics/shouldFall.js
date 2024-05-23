const shouldFall = (ball, y, gap = 0) => {
    if (y < innerHeight - gap) {
        ball.fallHeight = innerHeight - gap;
        ball.status = "falling";
        return true;
    }
    // Add fallHeight also to stopped balls for handling depth sorting
    ball.fallHeight = innerHeight - gap + (y - (innerHeight - gap));
    return false;
};
export default shouldFall;
