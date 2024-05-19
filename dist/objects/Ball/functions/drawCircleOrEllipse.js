const drawCircleOrEllipse = (context, x, y, fallHeight, radius, angle, isEllipse) => {
    context.beginPath();
    context.translate(x, y);
    if (isEllipse) {
        context.ellipse(0, 0, fallHeight - y + radius, fallHeight - y, 0, 0, Math.PI * 2);
        return context.closePath();
    }
    context.rotate(angle / 360 * 3.14);
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.closePath();
};
export default drawCircleOrEllipse;
