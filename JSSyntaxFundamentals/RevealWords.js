function findWordsInSentence(string, text) {
  const words = string.split(", ");

  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    const wordLength = word.length;
    const template = "*".repeat(wordLength);

    text = text.replace(template, word);
  }

  console.log(text);
}

findWordsInSentence(
  "great, learning",
  "softuni is ***** place for ******** new programming languages"
);
