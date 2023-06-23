function findSpecialWords(input) {
  let index = input.indexOf("#");
  const specialWords = [];
  let letter = input.substring(index + 1, index + 2);
  let word = "";

  while (index !== -1) {
    while (letter !== " " && letter !== "") {
      word += letter;
      index++;
      letter = input.substring(index + 1, index + 2);
    }

    if (word.length > 0) {
      specialWords.push(word);
    }

    input = input.replace("#", "");
    index = input.indexOf("#");
    letter = input.substring(index + 1, index + 2);
    word = "";
  }

  specialWords.forEach((word) => {
    console.log(word);
  });
}

findSpecialWords(
  "The symbol # is known #variously in English-speaking #regions as the #number sign"
);
