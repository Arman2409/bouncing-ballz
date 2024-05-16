export class Ball {
    x;
    y;
    radius;
    color;
    velocity = {
        x: 0,
        y: 0
    };
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    update() {
        // Update logic
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Full circle
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}
