const fillWithGradient = (
    context: CanvasRenderingContext2D, 
    radius: number,
    colors: string[]
) => {
    const gradient = context.createLinearGradient(-radius, 0, radius, 0);
    for (let i = 0; i < colors.length; i++) {
      gradient.addColorStop(i * (1 / colors.length), colors[i]);
    }
    context.fillStyle = gradient;
    context.fill();
}

export default fillWithGradient;