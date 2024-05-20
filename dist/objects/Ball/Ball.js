import { fallSpeed, radiusRange, colorsCountRange, ballsFallDistance } from "../../configs/ballConfigs.js";
import getRandomNumberInRange from "./helpers/getRandomNumberInRange.js";
import getRandomColor from "./helpers/getRandomColor.js";
import fillWithGradient from "./functions/fillWithGradient.js";
import drawCircleOrEllipse from "./functions/drawCircleOrEllipse.js";
export class Ball {
    x;
    y;
    radius;
    rotateAngle = 0;
    xChange = 0;
    colors = [];
    fallHeight;
    collapsing = false;
    speed = 0;
    status = "falling";
    constructor(x, y, fallHeight) {
        this.x = x;
        this.y = y;
        // Get random colors for gradient 
        for (let i = 0; i < getRandomNumberInRange(colorsCountRange[0], colorsCountRange[1]); i++) {
            this.colors.push(getRandomColor());
        }
        // Get random radius 
        this.radius = getRandomNumberInRange(radiusRange[0], radiusRange[1]);
        this.fallHeight = fallHeight - ballsFallDistance / 2;
    }
    update(delta, canvasWidth, removeFromArr) {
        switch (this.status) {
            case "stopped":
                // Remove the ball from the balls which need to be updated 
                removeFromArr(this);
                break;
            case "falling":
                this.handleFalling(delta);
                break;
            case "rising":
                this.handleRising(delta, canvasWidth);
                break;
        }
    }
    handleFalling(delta) {
        const { y, fallHeight, radius, speed } = { ...this };
        // Check if the ball is in the bottom of the screen 
        if (y >= fallHeight - radius) {
            // Check if the ball has no more speed left to bounce 
            if (speed < fallSpeed) {
                return this.stop();
            }
            ;
            // Check if the ball has finished squashing 
            if (y >= fallHeight - radius / 2) {
                return this.bounce();
            }
            this.collapsing = true;
        }
        this.speed += fallSpeed;
        this.y = y + (delta * this.speed);
        if (this.y >= fallHeight) {
            return this.y = fallHeight;
        }
    }
    handleRising(delta, canvasWidth) {
        // Check if the ball has reached the peak of its trajectory
        if (this.speed <= 0) {
            return this.status = "falling";
        }
        this.speed -= fallSpeed * 2;
        this.y = this.y - (delta * this.speed);
        // Prevent balls from leaving the screen
        if (this.x >= canvasWidth - this.radius
            || this.x <= this.radius)
            return;
        this.x = this.x + this.xChange;
    }
    stop() {
        this.status = "stopped";
        this.y = this.fallHeight - this.radius;
    }
    bounce() {
        this.collapsing = false;
        this.status = "rising";
        // Check if the ball is bouncing first time and add some deviation
        if (!this.xChange) {
            this.fallHeight = this.fallHeight + ballsFallDistance / 2 - getRandomNumberInRange(0, ballsFallDistance);
            return this.xChange = getRandomNumberInRange(-0.5, 0.5);
        }
        this.rotateAngle = this.rotateAngle += this.xChange > 0 ? 15 : -15;
    }
    draw(context) {
        const { x, y, fallHeight, radius, rotateAngle, collapsing, colors } = { ...this };
        context.save();
        drawCircleOrEllipse(context, x, y, fallHeight, radius, rotateAngle, collapsing);
        fillWithGradient(context, radius, colors);
        context.closePath();
        context.restore();
    }
}
