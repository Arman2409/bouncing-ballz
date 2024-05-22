import { circleAnimationDuration, clickCircleSize } from "../configs/mouseConfigs.js";

const createPulsingCircle = (
    clientX: number,
    clientY: number,
    color: string,
) => {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.borderColor = color;
  circle.style.left = `${clientX - clickCircleSize / 2}px`;
  circle.style.top = `${clientY - clickCircleSize / 2}px`;
  document.body.appendChild(circle);

  // Set a timeout to remove the circle after the animation duration
  setTimeout(() => {
    circle.remove();
  }, circleAnimationDuration);
}

export default createPulsingCircle;