const dollarStringToInt = (dollarString) => {
    // Remove any non-numeric characters from the string
  var numericString = dollarString.replace(/[^0-9]/g, '');

  // Parse the numeric string to an integer
  var dollarAmount = parseInt(numericString, 10);

  // Return the integer value
  return dollarAmount;
}

export default dollarStringToInt