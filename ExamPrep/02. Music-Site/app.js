window.addEventListener("load", solve);

function solve() {
  const inputElements = {
    genre: document.getElementById("genre"),
    name: document.getElementById("name"),
    author: document.getElementById("author"),
    date: document.getElementById("date"),
  };

  document.getElementById("add-btn").addEventListener("click", (e) => {
    e.preventDefault();

    if (isEmpty()) {
      return;
    }

    const hitsContainer = document.querySelector(".all-hits-container");
    const hitsInfo = createElement("div", null, ["hits-info"], null, hitsContainer);

    const image = document.createElement("img");
    image.src = "./static/img/img.png";
    hitsInfo.appendChild(image);

    createElement("h2", `Genre: ${inputElements.genre.value}`, null, null, hitsInfo);
    createElement("h2", `Name: ${inputElements.name.value}`, null, null, hitsInfo);
    createElement("h2", `Author: ${inputElements.author.value}`, null, null, hitsInfo);
    createElement("h3", `Date: ${inputElements.date.value}`, null, null, hitsInfo);

    const saveButton = createElement("button", "Save song", ["save-btn"], null, hitsInfo);
    saveButton.addEventListener("click", saveSong);

    const likeButton = createElement("button", "Like song", ["like-btn"], null, hitsInfo);
    likeButton.addEventListener("click", likeSong);

    const deleteButton = createElement("button", "Delete", ["delete-btn"], null, hitsInfo);
    deleteButton.addEventListener("click", deleteSong);

    Object.values(inputElements).forEach((element) => (element.value = ""));
  });

  function likeSong(e) {
    const likesParagraph = document.querySelector(".likes p");
    const likesCount = Number(likesParagraph.textContent.split(": ")[1]);
    likesParagraph.textContent = `Total Likes: ${likesCount + 1}`;
    e.target.disabled = true;
  }

  function saveSong(e) {
    const songElement = e.target.parentElement;

    songElement.querySelector(".save-btn").remove();
    songElement.querySelector(".like-btn").remove();
    document.querySelector(".saved-container").appendChild(songElement);
  }

  function deleteSong(e) {
    e.target.parentElement.remove();
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
}
