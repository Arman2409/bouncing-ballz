const getRandomColor = () => {
    const hexCode = "#" + Array(6).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    return hexCode;
};
export default getRandomColor;
