import getRandomNumberInRange from "./helpers/getRandomNumberInRange.js";
import drawCircleOrEllipse from "./functions/drawCircleOrEllipse.js";
import handleFalling from "./handlers/handleFalling.js";
import handleRising from "./handlers/handleRising.js";
import type { BallStatus } from "../../types/objects/ballTypes.js";

export class Ball {
  x: number;
  y: number;
  fallHeight: number = 0;
  speed: number = 0;
  isCollapsing: boolean = false;
  status: BallStatus = "stopped";

  private yHasChanged: boolean = false;
  private rotateAngle: number = 0;
  private xChange: number = 0;

  readonly radius: number;
  readonly fallRadius:number;
  readonly color: string;
  readonly borderColor: string;
  readonly decorationColor:string;

  constructor(
    x: number, 
    y: number, 
    radius: number,
    fallRadius: number,
    color: string, 
    borderColor:string,
    decorationColor:string,
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
    this.borderColor = borderColor;
    this.decorationColor = decorationColor;
    this.fallRadius = fallRadius;
  }

  update(
    delta: number,
    canvasWidth: number,
    removeFromActiveBalls: Function) {
    switch (this.status) {
      case "stopped":
        // Remove the ball from the balls which need to be updated 
        removeFromActiveBalls(this);
        break;
      case "falling":
        handleFalling(this, delta);
        break;
      case "rising":
        handleRising(this, delta, this.xChange, canvasWidth);
        break;
    }
  }

  fall() {
    this.status = "falling";
    if (this.fallHeight - this.y < this.radius / 4) {
      this.stop();
    }
    if (!this.yHasChanged) {
      this.fallHeight = this.fallHeight + this.fallRadius / 2 - getRandomNumberInRange(this.radius, this.fallRadius - this.radius);
      this.yHasChanged = true;
    }
  }

  stop() {
    this.isCollapsing = false;
    this.status = "stopped";
    this.y = this.fallHeight
  }

  bounce() {
    this.isCollapsing = false;
    this.status = "rising";
    // Check if the ball is bouncing first time and add some deviation
    if (!this.xChange) {
      return this.xChange = getRandomNumberInRange(-0.5, 0.5);
    }
    this.rotateAngle = this.rotateAngle += this.xChange > 0 ? 50 : -50;
  }

  draw(context: CanvasRenderingContext2D) {
    const {
      x,
      y,
      fallHeight,
      radius,
      rotateAngle,
      isCollapsing,
      color,
      borderColor,
      decorationColor } = { ...this }
    context.save();
    drawCircleOrEllipse(
      context,
      isCollapsing,
      x,
      y,
      fallHeight,
      radius,
      rotateAngle,
      color,
      borderColor,
      decorationColor
    )
    context.restore();
  }
}