const API_URL = "http://localhost:3030/jsonstore/collections/books";

const buttonElements = {
  loadButton: document.getElementById("loadBooks"),
  submitButton: document.querySelector("#form button"),
};

function attachEvents() {
  buttonElements.loadButton.addEventListener("click", loadBooks);
  buttonElements.submitButton.addEventListener("click", createBook);
}

const inputElements = {
  author: document.querySelector("input[name='author']"),
  title: document.querySelector("input[name='title']"),
};

async function loadBooks() {
  const books = await (await fetch(API_URL)).json();

  const table = document.querySelector("tbody");
  table.innerHTML = "";

  Object.values(books).forEach(({ title, author, _id }) => {
    const tr = createElement("tr", null, null, null, table);

    createElement("td", title, null, null, tr);
    createElement("td", author, null, null, tr);

    const buttons = createElement("td", null, null, null, tr);
    const editButton = createElement("button", "Edit", null, null, buttons);
    editButton.addEventListener("click", () => {
      document.querySelector("#form h3").textContent = "Edit FORM";
      buttonElements.submitButton.remove();

      inputElements.author.value = author;
      inputElements.title.value = title;

      const saveButton = createElement(
        "button",
        "Save",
        null,
        _id,
        document.querySelector("#form")
      );
      saveButton.addEventListener("click", saveBook);
    });

    const deleteButton = createElement("button", "Delete", null, null, buttons);
    deleteButton.addEventListener("click", async () => {
      await fetch(`${API_URL}/${_id}`, { method: "DELETE" });
      await loadBooks();
    });
  });
}

async function createBook() {
  if (isEmpty()) {
    return;
  }

  const book = {
    author: inputElements.author.value,
    title: inputElements.title.value,
  };

  await fetch(API_URL, { method: "POST", body: JSON.stringify(book) });
  await loadBooks();
}

async function saveBook(e) {
  const modifiedBook = {
    author: inputElements.author.value,
    title: inputElements.title.value,
  };

  await fetch(`${API_URL}/${e.target.id}`, {
    method: "PUT",
    body: JSON.stringify(modifiedBook),
  });

  document.querySelector("#form h3").textContent = "FORM";
  e.target.remove();
  createElement("button", "Submit", null, null, document.querySelector("#form"));

  await loadBooks();
}

function createElement(type, textContent, classes, id, parent) {
  const element = document.createElement(type);

  if (textContent) {
    element.textContent = textContent;
  }

  if (classes && classes.length > 0) {
    element.classList.add(...classes);
  }

  if (id) {
    element.setAttribute("id", id);
  }

  if (parent) {
    parent.appendChild(element);
  }

  return element;
}

function isEmpty() {
  return Object.values(inputElements).some((element) => element.value === "");
}

attachEvents();
