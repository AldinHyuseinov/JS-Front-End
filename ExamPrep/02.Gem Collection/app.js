window.addEventListener("load", solve);

function solve() {
  const inputElements = {
    gemName: document.getElementById("gem-name"),
    color: document.getElementById("color"),
    carats: document.getElementById("carats"),
    price: document.getElementById("price"),
    type: document.getElementById("type"),
  };

  const addButton = document.getElementById("add-btn");
  addButton.addEventListener("click", () => {
    if (isEmpty()) {
      return;
    }

    const inputValues = {
      gemName: inputElements.gemName.value,
      color: inputElements.color.value,
      carats: inputElements.carats.value,
      price: inputElements.price.value,
      type: inputElements.type.value,
    };

    const previewList = document.getElementById("preview-list");
    const gemInfo = createElement("li", null, ["gem-info"], null, previewList);

    const article = createElement("article", null, null, null, gemInfo);
    createElement("h4", `${inputValues.gemName}`, null, null, article);
    createElement("p", `Color: ${inputValues.color}`, null, null, article);
    createElement("p", `Carats: ${inputValues.carats}`, null, null, article);
    createElement("p", `Price: ${inputValues.price}$`, null, null, article);
    createElement("p", `Type: ${inputValues.type}`, null, null, article);

    const saveButton = createElement("button", "Save to Collection", ["save-btn"], null, gemInfo);
    saveButton.addEventListener("click", (e) => {
      e.target.parentElement.remove();

      const collection = document.getElementById("collection");
      const li = createElement("li", null, null, null, collection);
      createElement(
        "p",
        `${inputValues.gemName} - Color: ${inputValues.color}/ Carats: ${inputValues.carats}/ Price: ${inputValues.price}$/ Type: ${inputValues.type}`,
        ["collection-item"],
        null,
        li
      );

      addButton.disabled = false;
    });

    const editButton = createElement("button", "Edit Information", ["edit-btn"], null, gemInfo);
    editButton.addEventListener("click", (e) => {
      e.target.parentElement.remove();

      inputElements.gemName.value = inputValues.gemName;
      inputElements.color.value = inputValues.color;
      inputElements.carats.value = inputValues.carats;
      inputElements.price.value = inputValues.price;
      inputElements.type.value = inputValues.type;

      addButton.disabled = false;
    });

    const cancelButton = createElement("button", "Cancel", ["cancel-btn"], null, gemInfo);
    cancelButton.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      addButton.disabled = false;
    });

    addButton.disabled = true;
    clearForm();
  });

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

  function clearForm() {
    Object.values(inputElements).forEach((element) => (element.value = ""));
  }

  function isEmpty() {
    Object.values(inputElements).some((element) => element.value === "");
  }
}
