import { fallSpeed, radiusRange } from "../../configs/ballConfigs.js";
import getRandomNumberInRange from "../../helpers/getRandomNumberInRange.js";
import getRandomColor from "./helpers/getRandomColor.js";

export class Ball {
  x: number;
  y: number;
  radius: number;
  rotateAngle: number = 0;
  xChange: number = 0;
  colors: string[] = [];
  velocity: {
    x: number,
    y: number
  } = {
      x: 0,
      y: 0
    }
  status: "falling" | "rising" | "stopped" = "falling"
  speed = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    for (let i = 0; i < 5; i++) {
      this.colors.push(getRandomColor());
    }
    this.radius = getRandomNumberInRange(radiusRange[0], radiusRange[1]);
  }

  update(deltaTime: number, canvasWidth: number, canvasHeight: number) {
    if (this.status === "falling") {
      if (this.y >= canvasHeight - this.radius) {
        if (this.speed < 9.8) return;
        this.rotateAngle = this.rotateAngle += this.xChange > 0 ? 40 : -40;
        this.status = "rising";
        if (this.xChange) return;
        this.xChange = getRandomNumberInRange(-0.5, 0.5);
        return;
      }
      this.speed += fallSpeed;
      this.y = this.y + (deltaTime * this.speed);
    }
    if (this.status === "rising") {
      if (this.speed <= 0) {
        this.status = "falling";
        return;
      }
      this.speed -= fallSpeed * 2;
      this.y = this.y - (deltaTime * this.speed);
      this.x = this.x + this.xChange;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.beginPath();
    context.translate(this.x + this.radius, this.y + this.radius)
    context.rotate(this.rotateAngle / 360 * 3.14)
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    const gradient = context.createLinearGradient(-this.radius, 0, this.radius, 0);
    for (let i = 0; i < this.colors.length; i++) {
      gradient.addColorStop(i * (1 / this.colors.length), this.colors[i]);
    }
    context.fillStyle = gradient;
    context.fill();
    context.closePath();
    context.restore()
  }
}
