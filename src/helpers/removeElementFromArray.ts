const removeElementFromArray = (arr:any[], element:any) => {
    // Check for valid input
    if (!Array.isArray(arr)) {
      throw new Error("Input is not an array");
    }
  
    // Find the index of the element using findIndex
    const index = arr.findIndex(item => item === element);
  
    // Check if element found
    if (index === -1) {
      throw new Error("Element not found to remove"); // Element not found, return null
    }
  
    // Remove the element using splice
     arr.splice(index, 1)
}

export default removeElementFromArray;