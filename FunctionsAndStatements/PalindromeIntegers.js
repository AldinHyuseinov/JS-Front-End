function findPalindrome(array) {
  for (let index = 0; index < array.length; index++) {
    const number = array[index];
    const numberReversed = Number(String(number).split("").reverse().join(""));

    if (number === numberReversed) {
      console.log("true");
    } else {
      console.log("false");
    }
  }
}

findPalindrome([123, 323, 421, 121]);
findPalindrome([32, 2, 232, 1010]);
