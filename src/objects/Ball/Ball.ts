import { ballsFallDistance, ballBorderColor, ballDecorationColor } from "../../configs/ballConfigs.js";
import getRandomNumberInRange from "./helpers/getRandomNumberInRange.js";
import drawCircleOrEllipse from "./functions/drawCircleOrEllipse.js";
import handleFalling from "./handlers/handleFalling.js";
import handleRising from "./handlers/handleRising.js";
import type { ElementStatus } from "../../types/global.js";

export class Ball {
  x: number;
  y: number;
  radius: number;
  rotateAngle: number = 0;
  xChange: number = 0;
  yChanged: boolean = false;
  fallHeight: number = 0;
  color: string = "#000000";
  ballBorderColor: string = "#FFFFFF";
  ballDecorationColor: string = "#FFFFFF";
  isCollapsing: boolean = false;
  speed: number = 0;
  status: ElementStatus = "stopped";

  constructor(x: number, y: number, radius: number, color: string, innerHeight: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.ballBorderColor = ballBorderColor;
    this.ballDecorationColor = ballDecorationColor
    this.radius = 20;
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
        handleRising(this, delta, canvasWidth);
        break;
    }
  }

  fall() {
    this.status = "falling";
    if( this.fallHeight - this.y < this.radius / 4) {
      this.stop();
    }
    if (!this.yChanged) {
      this.fallHeight = this.fallHeight + ballsFallDistance / 2 - getRandomNumberInRange(0, ballsFallDistance);
      this.yChanged = true;
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
      ballBorderColor,
      ballDecorationColor } = { ...this }
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
      ballBorderColor,
      ballDecorationColor
    )
    context.restore();
  }
}