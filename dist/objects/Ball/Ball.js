import { fallSpeed, radiusRange } from "../../configs/ballConfigs.js";
import getRandomNumberInRange from "./helpers/getRandomNumberInRange.js";
import getRandomColor from "./helpers/getRandomColor.js";
export class Ball {
    x;
    y;
    radius;
    rotateAngle = 0;
    xChange = 0;
    colors = [];
    status = "falling";
    speed = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // Get random colors for gradient 
        for (let i = 0; i < 5; i++) {
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
            if (this.speed < 9.8) {
                this.status = "stopped";
                return;
            }
            ;
            this.rotateAngle = this.rotateAngle += this.xChange > 0 ? 40 : -40;
            this.status = "rising";
            if (!this.xChange)
                this.xChange = getRandomNumberInRange(-0.5, 0.5);
            return;
        }
        this.speed += fallSpeed;
        this.y = this.y + (deltaTime * this.speed);
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
    draw(context) {
        context.save();
        context.beginPath();
        context.translate(this.x, this.y);
        context.rotate(this.rotateAngle / 360 * 3.14);
        // Draw the circle 
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        const gradient = context.createLinearGradient(-this.radius, 0, this.radius, 0);
        for (let i = 0; i < this.colors.length; i++) {
            gradient.addColorStop(i * (1 / this.colors.length), this.colors[i]);
        }
        context.fillStyle = gradient;
        context.fill();
        context.closePath();
        context.restore();
    }
}
