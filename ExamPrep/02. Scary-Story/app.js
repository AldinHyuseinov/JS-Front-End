window.addEventListener("load", solve);

function solve() {
  const inputFields = {
    firstName: document.getElementById("first-name"),
    lastName: document.getElementById("last-name"),
    age: document.getElementById("age"),
    genre: document.getElementById("genre"),
    title: document.getElementById("story-title"),
    storyText: document.getElementById("story"),
  };

  const publishButton = document.getElementById("form-btn");

  publishButton.addEventListener("click", () => {
    if (fieldsEmpty()) {
      return;
    }

    document
      .getElementById("preview-list")
      .appendChild(createListItem(createArticle(), ...createButtons()));

    clearFields();
    publishButton.disabled = true;

    document.querySelector(".save-btn").addEventListener("click", handleSaveEvent);
    document.querySelector(".edit-btn").addEventListener("click", handleEditEvent);
    document.querySelector(".delete-btn").addEventListener("click", handleDeleteEvent);
  });

  function handleSaveEvent() {
    document.getElementById("main").innerHTML = "<h1>Your scary story is saved!</h1>";
  }

  function handleEditEvent() {
    const generalSelector = "li article";

    const [firstName, lastName] = document
      .querySelector(`${generalSelector} h4`)
      .textContent.split(": ")[1]
      .split(" ");

    inputFields.firstName.value = firstName;
    inputFields.lastName.value = lastName;

    inputFields.age.value = document
      .querySelector(`${generalSelector} p:nth-child(2)`)
      .textContent.split(": ")[1];

    inputFields.title.value = document
      .querySelector(`${generalSelector} p:nth-child(3)`)
      .textContent.split(": ")[1];

    inputFields.genre.value = document
      .querySelector(`${generalSelector} p:nth-child(4)`)
      .textContent.split(": ")[1];

    inputFields.storyText.value = document.querySelector(
      `${generalSelector} p:nth-child(5)`
    ).textContent;

    removePreviewStory();
  }

  function handleDeleteEvent() {
    removePreviewStory();
  }

  function createListItem(...elementsToAppend) {
    const li = document.createElement("li");
    li.classList.add("story-info");
    elementsToAppend.forEach((element) => li.appendChild(element));

    return li;
  }

  function createArticle() {
    const name = document.createElement("h4");
    name.textContent = `Name: ${inputFields.firstName.value} ${inputFields.lastName.value}`;

    const article = document.createElement("article");
    article.appendChild(name);
    article.appendChild(createParagraph("age"));
    article.appendChild(createParagraph("title"));
    article.appendChild(createParagraph("genre"));
    article.appendChild(createParagraph());

    return article;
  }

  function createParagraph(content) {
    const paragraph = document.createElement("p");
    paragraph.textContent = content
      ? `${upperCaseFirstLetter(content)}: ${inputFields[content].value}`
      : inputFields.storyText.value;

    return paragraph;
  }

  function createButtons() {
    return [createButton("save"), createButton("edit"), createButton("delete")];
  }

  function createButton(buttonPurpose) {
    const button = document.createElement("button");
    button.classList.add(`${buttonPurpose}-btn`);
    button.textContent = `${upperCaseFirstLetter(buttonPurpose)} Story`;

    return button;
  }

  function upperCaseFirstLetter(word) {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }

  function removePreviewStory() {
    document.querySelector("li").remove();
    publishButton.disabled = false;
  }

  function fieldsEmpty() {
    return Object.values(inputFields).some((input) => input.value === "");
  }

  function clearFields() {
    return Object.values(inputFields).forEach((input) => (input.value = ""));
  }
}
