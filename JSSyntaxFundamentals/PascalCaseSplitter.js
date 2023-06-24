function splitWords(text) {
  console.log(text.split(/(?=[A-Z])/).join(", "));
}

splitWords("SplitMeIfYouCanHaHaYouCantOrYouCan");
