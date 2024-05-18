const getGradientDegrees = (x, y, radius, degrees) => {
    degrees = degrees % 360;
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    if (degrees <= 180) {
        x1 = x + degrees / 180 * (radius * 2);
        const degreesMnacord = degrees % 90;
        y1 = y - degrees % 180 / 180 * radius;
        x2 = x + radius * 2 - degrees / 180 * (radius * 2);
        y2 = y + degrees % 180 / 180 * radius;
    }
    x1 = x + degrees / 180 * (radius * 2);
    const degreesMnacord = degrees % 90;
    y1 = y + degrees % 180 / 180 * radius;
    x2 = x + radius * 2 - degrees / 180 * (radius * 2);
    y2 = y - degrees % 180 / 180 * radius;
    // console.log({
    //     x1,
    //     y1,
    //     x2,
    //     y2,
    // });
    return {
        x1,
        y1,
        x2,
        y2,
    };
};
export default getGradientDegrees;
