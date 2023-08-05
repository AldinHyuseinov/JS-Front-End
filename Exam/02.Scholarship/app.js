window.addEventListener("load", solve);

function solve() {
  const inputElements = {
    studentName: document.getElementById("student"),
    university: document.getElementById("university"),
    score: document.getElementById("score"),
  };

  const nextButton = document.getElementById("next-btn");
  nextButton.addEventListener("click", () => {
    if (isEmpty()) {
      return;
    }

    const inputValues = {
      studentName: inputElements.studentName.value,
      university: inputElements.university.value,
      score: inputElements.score.value,
    };

    const previewList = document.getElementById("preview-list");
    const li = createElement("li", null, ["application"], null, previewList);

    const article = createElement("article", null, null, null, li);
    createElement("h4", `${inputValues.studentName}`, null, null, article);
    createElement("p", `University: ${inputValues.university}`, null, null, article);
    createElement("p", `Score: ${inputValues.score}`, null, null, article);

    const editButton = createElement("button", "edit", ["action-btn", "edit"], null, li);
    editButton.addEventListener("click", (e) => {
      e.target.parentElement.remove();

      inputElements.studentName.value = inputValues.studentName;
      inputElements.university.value = inputValues.university;
      inputElements.score.value = inputValues.score;

      nextButton.disabled = false;
    });

    const applyButton = createElement("button", "apply", ["action-btn", "apply"], null, li);
    applyButton.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      e.target.remove();
      parent.querySelector("button").remove();

      document.getElementById("candidates-list").appendChild(parent);

      nextButton.disabled = false;
    });

    clearForm();
    nextButton.disabled = true;
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
    return Object.values(inputElements).some((element) => element.value === "");
  }
}
