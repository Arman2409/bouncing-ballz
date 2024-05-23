const drawCircleOrEllipse = (
  ctx: CanvasRenderingContext2D,
  isEllipse: boolean,
  x: number,
  y: number,
  fallHeight: number,
  radius: number,
  angle: number,
  color: string,
  ballBorderColor: string,
  decorationColor: string
) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = ballBorderColor;
  if (isEllipse) {
    const squashRadiusY =  fallHeight - y > radius * 0.75 ? fallHeight - y : radius * 0.75;
    const squashRadiusX = radius * 2 - squashRadiusY;
    ctx.ellipse(
      x,
      y,
      squashRadiusX,
      squashRadiusY,
      0,
      0,
      Math.PI * 2
    )
    ctx.fill()
    ctx.stroke()
    return ctx.closePath();
  }
  ctx.translate(x, y)
  ctx.rotate(angle / 360 * 3.14);
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = decorationColor;
  // Draw the decoration ellipse 
  ctx.ellipse(radius - 6, 0, 1, 4, 0,  0, Math.PI * 2);
  // Add shadow to the decoration 
  ctx.shadowBlur = 10; 
  ctx.shadowColor = decorationColor; 
  ctx.fill();
  ctx.closePath();
}

export default drawCircleOrEllipse;