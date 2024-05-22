const removeObjectFromArray = (arr, element) => {
    // Find the index of the element
    const index = arr.findIndex(item => item === element);
    // Check if element found
    if (index === -1) {
        console.error("Object not found for removal");
        return;
    }
    // Remove the element
    arr.splice(index, 1);
};
export default removeObjectFromArray;
