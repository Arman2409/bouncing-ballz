const createPulsingCircle = (
  clientX: number,
  clientY: number,
  size: number,
  animationDuration: number,
  color: string,
) => {
  // Create pulsing circle element 
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.borderColor = color;
  circle.style.left = `${clientX - size / 2}px`;
  circle.style.top = `${clientY - size / 2}px`;
  document.body.appendChild(circle);

  // Set a timeout to remove the circle after the animation duration
  setTimeout(() => circle.remove(), animationDuration);
}

export default createPulsingCircle;