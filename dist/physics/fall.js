const fall = (item) => {
    // (item as { setFallHeight: Function }).setFallHeight(innerHeight);
    item.status = "falling";
};
export default fall;
