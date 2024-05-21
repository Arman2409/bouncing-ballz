const drawCircleOrEllipse = (isEllipse, x, y, fallHeight, radius, angle, color, borderColor, ctx) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = borderColor;
    if (isEllipse) {
        ctx.ellipse(x, y, radius + radius / 4, fallHeight - y, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        return ctx.closePath();
    }
    ctx.translate(x, y);
    ctx.rotate(angle / 360 * 3.14);
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.ellipse(radius - 6, 0, 1, 4, 0, 0, Math.PI * 2);
    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";
    ctx.fill();
    ctx.closePath();
};
export default drawCircleOrEllipse;
