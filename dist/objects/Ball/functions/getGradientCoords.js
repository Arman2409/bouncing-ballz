const getGradientCoordinates = (x, y, radius, angle) => {
    // converting the angle into positive value 
    const rotation = angle < 0 ? 360 - Math.abs(angle % 360) : angle % 360;
    const diff = radius / 45 * (rotation - (Math.floor(rotation / 45) * 45));
    if (rotation < 45)
        return {
            x1: x + diff,
            y1: y - radius,
            x2: x - diff,
            y2: y + radius,
        };
    else if (rotation < 90)
        return {
            x1: x + radius,
            y1: y - radius + diff,
            x2: x - radius,
            y2: y + radius - diff,
        };
    else if (rotation < 135)
        return {
            x1: x + radius,
            y1: y + diff,
            x2: x - radius,
            y2: y - diff,
        };
    else if (rotation < 180)
        return {
            x1: x + radius - diff,
            y1: y + radius,
            x2: x - radius + diff,
            y2: y - radius,
        };
    else if (rotation < 235)
        return {
            x1: x - diff,
            y1: y + radius,
            x2: x + diff,
            y2: y - radius,
        };
    else if (rotation < 270)
        return {
            x1: x - radius,
            y1: y + radius - diff,
            x2: x + radius,
            y2: y - radius + diff,
        };
    else if (rotation < 315)
        return {
            x1: x - radius,
            y1: y - diff,
            x2: x + radius,
            y2: y + diff,
        };
    // runs if rotation < 360
    console.log(Math.round(x - radius + diff));
    return {
        x1: Math.round(x - radius + diff),
        y1: Math.round(y - radius),
        x2: Math.round(x + radius - diff),
        y2: Math.round(y + radius),
    };
};
export default getGradientCoordinates;
