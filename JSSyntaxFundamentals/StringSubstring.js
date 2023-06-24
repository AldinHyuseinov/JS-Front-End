function findWordInText(word, text) {
  if (text.toLowerCase().includes(word.toLowerCase())) {
    console.log(word);
  } else {
    console.log(`${word} not found!`);
  }
}

findWordInText("python", "JavaScript is the best programming language");
