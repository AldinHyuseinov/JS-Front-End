function charsInRange(firstChar, secChar) {
  const chars = [];
  const firstCharCode = firstChar.charCodeAt(0);
  const secCharCode = secChar.charCodeAt(0);
  const startChar = firstCharCode < secCharCode ? firstCharCode + 1 : secCharCode + 1;
  const endChar = firstCharCode > secCharCode ? firstCharCode : secCharCode;

  for (let index = startChar; index < endChar; index++) {
    chars.push(String.fromCharCode(index));
  }

  console.log(chars.join(" "));
}

charsInRange("a", "d");
charsInRange("#", ":");
charsInRange("C", "#");
