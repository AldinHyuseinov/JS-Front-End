function sortAndPrintNames(names) {
  let counter = 1;
  names.sort().forEach((name) => console.log(`${counter++}.${name}`));
}

sortAndPrintNames(["John", "Bob", "Christina", "Ema"]);
