function findCountOfWords(input) {
  const wordsAndCount = {};

  input
    .shift()
    .split(" ")
    .forEach((word) => (wordsAndCount[word] = 0));

  input.forEach((word) => wordsAndCount.hasOwnProperty(word) && (wordsAndCount[word] += 1));

  Object.entries(wordsAndCount)
    .sort((a, b) => b[1] - a[1])
    .forEach((entry) => console.log(`${entry[0]} - ${entry[1]}`));
}

findCountOfWords([
  "this sentence task",
  "In",
  "this",
  "sentence",
  "you",
  "have",
  "to",
  "count",
  "the",
  "occurrences",
  "of",
  "the",
  "words",
  "this",
  "and",
  "sentence",
  "because",
  "this",
  "is",
  "your",
  "task",
]);

findCountOfWords([
  "is the",
  "first",
  "sentence",
  "Here",
  "is",
  "another",
  "the",
  "And",
  "finally",
  "the",
  "the",
  "sentence",
]);
