import getRandomNumberInRange from "./helpers/getRandomNumberInRange.js";
import drawCircleOrEllipse from "./functions/drawCircleOrEllipse.js";
import handleFalling from "./handlers/handleFalling.js";
import handleRising from "./handlers/handleRising.js";
export class Ball {
    x;
    y;
    fallHeight = 0;
    speed = 0;
    isCollapsing = false;
    status = "stopped";
    yHasChanged = false;
    rotateAngle = 0;
    xChange = 0;
    radius;
    fallRadius;
    color;
    borderColor;
    decorationColor;
    constructor(x, y, radius, fallRadius, color, borderColor, decorationColor) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.borderColor = borderColor;
        this.decorationColor = decorationColor;
        this.fallRadius = fallRadius;
    }
    update(delta, canvasWidth, removeFromActiveBalls) {
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
        this.y = this.fallHeight;
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
    draw(context) {
        const { x, y, fallHeight, radius, rotateAngle, isCollapsing, color, borderColor, decorationColor } = { ...this };
        context.save();
        drawCircleOrEllipse(context, isCollapsing, x, y, fallHeight, radius, rotateAngle, color, borderColor, decorationColor);
        context.restore();
    }
}
