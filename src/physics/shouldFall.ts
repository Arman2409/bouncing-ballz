import type { Ball } from "../objects/Ball/Ball.js";

const shouldFall = (
  ball: Ball,
  y: number,
  gap: number = 0
): boolean => {

  if (y < innerHeight - gap) {
    ball.fallHeight = innerHeight - gap;
    ball.status = "falling";
    return true;
  }

  // Add fallHeight also to stopped balls for handling depth sorting
  ball.fallHeight = innerHeight - gap + (y - (innerHeight - gap));
  return false;
}

export default shouldFall;