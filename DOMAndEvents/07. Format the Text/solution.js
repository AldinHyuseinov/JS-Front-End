function solve() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");

  const sentences = input.value.split(".");
  let paragraphs = [];

  for (let index = 0; index < sentences.length; index++) {
    if (sentences[index].length < 1) {
      continue;
    }

    paragraphs.push(`${sentences[index]}.`);

    if (paragraphs.length === 3) {
      createParagraph();
      paragraphs = [];
    }
  }

  if (paragraphs.length > 0) {
    createParagraph();
  }

  function createParagraph() {
    const p = document.createElement("p");
    p.textContent = paragraphs.join("");
    output.appendChild(p);
  }
}
