window.addEventListener("load", solve);

function solve() {
  const inputFields = {
    title: document.getElementById("task-title"),
    category: document.getElementById("task-category"),
    content: document.getElementById("task-content"),
  };

  document.getElementById("publish-btn").addEventListener("click", () => {
    if (!fieldsEmpty()) {
      document
        .getElementById("review-list")
        .appendChild(createListItem(createArticle(), ...createButtons()));

      clearFields();

      document.querySelector(".edit").addEventListener("click", handleEditButtonEvent);
      document.querySelector(".post").addEventListener("click", handlePostButtonEvent);
    }
  });

  function handleEditButtonEvent() {
    inputFields.title.value = document.querySelector(".rpost article h4").textContent;

    inputFields.category.value = document
      .querySelector(".rpost article p:nth-child(2)")
      .textContent.split(": ")[1];

    inputFields.content.value = document
      .querySelector(".rpost article p:nth-child(3)")
      .textContent.split(": ")[1];

    document.querySelector(".rpost").remove();
  }

  function handlePostButtonEvent() {
    document.querySelector(".edit").remove();
    document.querySelector(".post").remove();

    document.getElementById("published-list").appendChild(document.querySelector(".rpost"));

    document.querySelector(".review-list .rpost").remove();
  }

  function createListItem(...elementsToAppend) {
    const li = document.createElement("li");
    li.classList.add("rpost");

    elementsToAppend.forEach((element) => li.appendChild(element));

    return li;
  }

  function createArticle() {
    const h4 = document.createElement("h4");
    h4.textContent = inputFields.title.value;

    const categoryParagraph = document.createElement("p");
    categoryParagraph.textContent = `Category: ${inputFields.category.value}`;

    const contentParagraph = document.createElement("p");
    contentParagraph.textContent = `Content: ${inputFields.content.value}`;

    const article = document.createElement("article");
    article.appendChild(h4);
    article.appendChild(categoryParagraph);
    article.appendChild(contentParagraph);

    return article;
  }

  function createButtons() {
    const editButton = document.createElement("button");
    editButton.classList.add("action-btn", "edit");
    editButton.textContent = "Edit";

    const postButton = document.createElement("button");
    postButton.classList.add("action-btn", "post");
    postButton.textContent = "Post";

    return [editButton, postButton];
  }

  function fieldsEmpty() {
    return Object.values(inputFields).some((field) => field.value === "");
  }

  function clearFields() {
    Object.values(inputFields).forEach((field) => (field.value = ""));
  }
}
