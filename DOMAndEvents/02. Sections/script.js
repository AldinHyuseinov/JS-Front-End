function create(words) {
  words.forEach(() => {
    document.getElementById("content").appendChild(document.createElement("div"));
  });

  const divs = document.querySelectorAll("#content div");

  for (let index = 0; index < divs.length; index++) {
    const div = divs[index];
    const paragraph = document.createElement("p");
    paragraph.innerText = words[index];

    div.appendChild(paragraph);
    paragraph.style.display = "none";

    div.addEventListener("click", () => {
      paragraph.style.display = "block";
    });
  }
}
