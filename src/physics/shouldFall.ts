import type { Ball } from "../objects/Ball/Ball.js";

const shouldFall = (
    ball: Ball,
    y:number,
    gap: number
) => {
    if (y < innerHeight - gap) {
      ball.fallHeight = innerHeight - gap;
      return  ball.status = "falling";
    }
    
    ball.fallHeight = innerHeight - gap + (y - (innerHeight - gap));
}

export default shouldFall;