import { ballsFallDistance, ballBorderColor, ballDecorationColor } from "../../configs/ballConfigs.js";
import { dragCoefficient, fallAcceleration } from "../../configs/physicsConfigs.js";
import getRandomNumberInRange from "./helpers/getRandomNumberInRange.js";
import drawCircleOrEllipse from "./functions/drawCircleOrEllipse.js";
export class Ball {
    x;
    y;
    radius;
    rotateAngle = 0;
    xChange = 0;
    fallHeight = 0;
    color = "#000000";
    ballBorderColor = "#FFFFFF";
    ballDecorationColor = "#FFFFFF";
    isCollapsing = false;
    speed = 0;
    status = "stopped";
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        // Get random colors for gradient 
        this.color = color;
        this.ballBorderColor = ballBorderColor;
        this.ballDecorationColor = ballDecorationColor;
        this.radius = radius;
    }
    update(delta, canvasWidth, removeFromActiveBalls) {
        switch (this.status) {
            case "stopped":
                // Remove the ball from the balls which need to be updated 
                removeFromActiveBalls(this);
                break;
            case "falling":
                this.handleFalling(delta);
                break;
            case "rising":
                this.handleRising(delta, canvasWidth);
                break;
        }
    }
    setFallHeight(fallHeight) {
        this.fallHeight = fallHeight - ballsFallDistance / 2;
    }
    handleFalling(delta) {
        const { y, fallHeight, radius, speed } = { ...this };
        // Check if the ball is in the bottom of the screen 
        if (y >= fallHeight - radius) {
            // Check if the ball has no more speed left to bounce 
            if (speed < fallAcceleration) {
                return this.stop();
            }
            ;
            // Check if the ball has finished squashing 
            if (y >= fallHeight) {
                return this.bounce();
            }
            this.isCollapsing = true;
        }
        this.speed += fallAcceleration * (1 - dragCoefficient);
        this.y = y + (delta * this.speed);
        if (this.y >= fallHeight) {
            return this.y = fallHeight;
        }
    }
    handleRising(delta, canvasWidth) {
        // Check if the ball has reached the peak of its trajectory
        if (this.speed <= 0) {
            return this.fall();
        }
        this.speed -= fallAcceleration * 2;
        this.y = this.y - (delta * this.speed);
        // Prevent balls from leaving the screen
        if (this.x >= canvasWidth - this.radius
            || this.x <= this.radius)
            return;
        this.x = this.x + this.xChange;
    }
    fall() {
        this.status = "falling";
    }
    stop() {
        this.status = "stopped";
    }
    bounce() {
        this.isCollapsing = false;
        this.status = "rising";
        // Check if the ball is bouncing first time and add some deviation
        if (!this.xChange) {
            this.fallHeight = this.fallHeight + ballsFallDistance / 2 - getRandomNumberInRange(0, ballsFallDistance);
            return this.xChange = getRandomNumberInRange(-0.5, 0.5);
        }
        this.rotateAngle = this.rotateAngle += this.xChange > 0 ? 50 : -50;
    }
    draw(context) {
        const { x, y, fallHeight, radius, rotateAngle, isCollapsing, color, ballBorderColor, ballDecorationColor } = { ...this };
        context.save();
        drawCircleOrEllipse(context, isCollapsing, x, y, fallHeight, radius, rotateAngle, color, ballBorderColor, ballDecorationColor);
        context.restore();
    }
}
