function printEveryNthElement(array, step) {
  return array.filter((element, index) => index % step == 0);
}

printEveryNthElement(["5", "20", "31", "4", "20"], 2);
