import { fallSpeed, radiusRange, colorsCountRange } from "../../configs/ballConfigs.js";
import getRandomNumberInRange from "./helpers/getRandomNumberInRange.js";
import getRandomColor from "./helpers/getRandomColor.js";
import fillWithGradient from "./functions/fillWithGradient.js";
export class Ball {
    x;
    y;
    radius;
    rotateAngle = 0;
    xChange = 0;
    colors = [];
    status = "falling";
    collapsing = false;
    speed = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // Get random colors for gradient 
        for (let i = 0; i < getRandomNumberInRange(colorsCountRange[0], colorsCountRange[1]); i++) {
            this.colors.push(getRandomColor());
        }
        // Get random radius 
        this.radius = getRandomNumberInRange(radiusRange[0], radiusRange[1]);
    }
    update(deltaTime, canvasWidth, canvasHeight, removeFromArr) {
        if (canvasHeight <= 0) {
            throw new Error("Canvas width must be positive number");
        }
        switch (this.status) {
            case "stopped":
                // Remove the ball from the balls which need to be updated 
                removeFromArr(this);
                break;
            case "falling":
                this.handleFalling(deltaTime, canvasHeight);
                break;
            case "rising":
                this.handleRising(deltaTime);
                break;
        }
    }
    handleFalling(deltaTime, canvasHeight) {
        // Check if the ball is in the bottom of the screen 
        if (this.y >= canvasHeight - this.radius) {
            if (this.speed < fallSpeed) {
                return this.stop(canvasHeight);
            }
            ;
            if (this.y >= canvasHeight - this.radius / 2) {
                return this.bounce();
            }
            this.collapsing = true;
        }
        this.speed += fallSpeed;
        this.y = this.y + (deltaTime * this.speed);
        if (this.y >= canvasHeight) {
            return this.y = canvasHeight;
        }
    }
    handleRising(deltaTime) {
        // Check if the ball has reached the peak of its trajectory
        if (this.speed <= 0) {
            this.status = "falling";
            return;
        }
        this.speed -= fallSpeed * 2;
        this.y = this.y - (deltaTime * this.speed);
        this.x = this.x + this.xChange;
    }
    stop(canvasHeight) {
        this.status = "stopped";
        this.collapsing = false;
        this.y = canvasHeight - this.radius;
    }
    bounce() {
        this.collapsing = false;
        this.rotateAngle = this.rotateAngle += this.xChange > 0 ? 40 : -40;
        this.status = "rising";
        if (!this.xChange)
            this.xChange = getRandomNumberInRange(-0.5, 0.5);
    }
    draw(context, canvasHeight) {
        context.save();
        context.beginPath();
        context.translate(this.x, this.y);
        context.rotate(this.rotateAngle / 360 * 3.14);
        // Draw the circle
        if (this.collapsing) {
            context.ellipse(0, 0, canvasHeight - this.y + this.radius, canvasHeight - this.y, 0, 0, Math.PI * 2);
        }
        else
            context.arc(0, 0, this.radius, 0, Math.PI * 2);
        fillWithGradient(context, this.radius, this.colors);
        context.closePath();
        context.restore();
    }
}
