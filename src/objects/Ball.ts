export class Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number,
    y: number
  } = {
    x: 0,
    y: 0
  }

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  update() {
    // Update logic
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Full circle
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }
}
