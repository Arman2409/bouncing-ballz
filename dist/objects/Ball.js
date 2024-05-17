import { fallSpeed, radius } from "../configs/ballConfigs.js";
export class Ball {
    x;
    y;
    radius;
    velocity = {
        x: 0,
        y: 0
    };
    status = "falling";
    speed = 0;
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    update(deltaTime, canvasWidth, canvasHeight) {
        if (this.status === "falling") {
            if (this.y >= canvasHeight - radius) {
                this.status = "rising";
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
        }
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        var gradient = context.createLinearGradient(this.x - this.radius, this.y, this.x + this.radius, this.y);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(1, "green");
        context.fillStyle = gradient;
        context.fill();
        context.closePath();
    }
}
