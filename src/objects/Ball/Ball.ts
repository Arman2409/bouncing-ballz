import { fallSpeed, radiusRange, colorsCountRange, ballsFallDistance } from "../../configs/ballConfigs.js";
import getRandomNumberInRange from "./helpers/getRandomNumberInRange.js";
import getRandomColor from "./helpers/getRandomColor.js";
import fillWithGradient from "./functions/fillWithGradient.js";
import drawCircleOrEllipse from "./functions/drawCircleOrEllipse.js";
import type { BallStatus } from "../../types/objects/ballTypes.js";

export class Ball {
  x: number;
  y: number;
  radius: number;
  rotateAngle: number = 0;
  xChange: number = 0;
  colors: string[] = [];
  fallHeight: number;
  private status: BallStatus = "falling";
  private collapsing: boolean = false;
  private speed: number = 0;

  constructor(x: number, y: number, canvasHeight: number) {
    this.x = x;
    this.y = y;
    // Get random colors for gradient 
    for (let i = 0; i < getRandomNumberInRange(colorsCountRange[0], colorsCountRange[1]); i++) {
      this.colors.push(getRandomColor());
    }
    // Get random radius 
    this.radius = getRandomNumberInRange(radiusRange[0], radiusRange[1]);
    this.fallHeight = canvasHeight - getRandomNumberInRange(0, ballsFallDistance);
  }

  update(deltaTime: number, removeFromArr: Function) {
    switch (this.status) {
      case "stopped":
        // Remove the ball from the balls which need to be updated 
        removeFromArr(this);
        break;
      case "falling":
        this.handleFalling(deltaTime);
        break;
      case "rising":
        this.handleRising(deltaTime);
        break;
    }
  }

  private handleFalling(deltaTime: number) {
    // Check if the ball is in the bottom of the screen 
    if (this.y >= this.fallHeight - this.radius) {
      // Check if the ball has no more speed left to bounce 
      if (this.speed < fallSpeed) {
        return this.stop();
      };
      // Check if the ball has finished squashing 
      if (this.y >= this.fallHeight - this.radius / 2) {
        return this.bounce();
      }
      this.collapsing = true;
    }
    this.speed += fallSpeed;
    this.y = this.y + (deltaTime * this.speed);

    if (this.y >= this.fallHeight) {
      return this.y = this.fallHeight;
    }
  }

  private handleRising(deltaTime: number) {
    // Check if the ball has reached the peak of its trajectory
    if (this.speed <= 0) {
      return this.status = "falling";
    }
    this.speed -= fallSpeed * 2;
    this.y = this.y - (deltaTime * this.speed);
    this.x = this.x + this.xChange;
  }

  stop() {
    this.status = "stopped";
    this.collapsing = false;
    this.y = this.fallHeight - this.radius;
  }

  bounce() {
    this.collapsing = false;
    this.rotateAngle = this.rotateAngle += this.xChange > 0 ? 15 : -15;
    this.status = "rising";
    if (!this.xChange) this.xChange = getRandomNumberInRange(-0.5, 0.5);
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    drawCircleOrEllipse(context, this.x, this.y, this.fallHeight, this.radius, this.rotateAngle, this.collapsing)
    fillWithGradient(context, this.radius, this.colors);
    context.closePath();
    context.restore();
  }
}