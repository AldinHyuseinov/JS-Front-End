function findOddOccurrences(input) {
  const wordsAndCount = {};

  input
    .split(" ")
    .map((word) => word.toLowerCase())
    .forEach((word) => (wordsAndCount[word] = wordsAndCount[word] + 1 || 1));

  const oddOccurences = Object.entries(wordsAndCount)
    .filter((entry) => entry[1] % 2 !== 0)
    .map((entry) => entry[0]);

  console.log(oddOccurences.join(" "));
}

findOddOccurrences("Java C# Php PHP Java PhP 3 C# 3 1 5 C#");
findOddOccurrences("Cake IS SWEET is Soft CAKE sweet Food");
