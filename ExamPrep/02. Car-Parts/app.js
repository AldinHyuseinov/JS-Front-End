window.addEventListener("load", solve);

function solve() {
  const inputElements = {
    carModel: document.getElementById("car-model"),
    carYear: document.getElementById("car-year"),
    partName: document.getElementById("part-name"),
    partNumber: document.getElementById("part-number"),
    condition: document.getElementById("condition"),
  };

  const otherElements = {
    img: document.getElementById("complete-img"),
    paragraph: document.getElementById("complete-text"),
  };

  const nextButton = document.getElementById("next-btn");
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (isEmpty()) {
      return;
    }

    const year = Number(inputElements.carYear.value);

    if (year < 1980 || year > 2023) {
      return;
    }

    otherElements.img.style.visibility = "hidden";
    otherElements.paragraph.textContent = "";

    const infoList = document.querySelector(".info-list");
    const partContent = createElement("li", null, ["part-content"], null, infoList);

    const article = createElement("article", null, null, null, partContent);
    createElement("p", `Car Model: ${inputElements.carModel.value}`, null, null, article);
    createElement("p", `Car Year: ${inputElements.carYear.value}`, null, null, article);
    createElement("p", `Part Name: ${inputElements.partName.value}`, null, null, article);
    createElement("p", `Part Number: ${inputElements.partNumber.value}`, null, null, article);
    createElement("p", `Condition: ${inputElements.condition.value}`, null, null, article);

    const editButton = createElement("button", "Edit", ["edit-btn"], null, partContent);
    editButton.addEventListener("click", editPart);

    const continueButton = createElement("button", "Continue", ["continue-btn"], null, partContent);
    continueButton.addEventListener("click", confirmOrder);

    e.target.disabled = true;
    clearForm();
  });

  function editPart(e) {
    const parent = e.target.parentElement;

    inputElements.carModel.value = parent
      .querySelector("article p:nth-child(1)")
      .textContent.split(": ")[1];

    inputElements.carYear.value = parent
      .querySelector("article p:nth-child(2)")
      .textContent.split(": ")[1];

    inputElements.partName.value = parent
      .querySelector("article p:nth-child(3)")
      .textContent.split(": ")[1];

    inputElements.partNumber.value = parent
      .querySelector("article p:nth-child(4)")
      .textContent.split(": ")[1];

    inputElements.condition.value = parent
      .querySelector("article p:nth-child(5)")
      .textContent.split(": ")[1];

    parent.remove();
    nextButton.disabled = false;
  }

  function confirmOrder(e) {
    const parent = e.target.parentElement;
    parent.querySelector(".edit-btn").remove();
    e.target.remove();

    const confirmButton = createElement("button", "Confirm", ["confirm-btn"], null, parent);
    confirmButton.addEventListener("click", orderPart);

    const cancelButton = createElement("button", "Cancel", ["cancel-btn"], null, parent);
    cancelButton.addEventListener("click", cancelOrder);

    document.querySelector(".confirm-list").appendChild(parent);
  }

  function orderPart(e) {
    e.target.parentElement.remove();
    nextButton.disabled = false;

    otherElements.img.style.visibility = "visible";
    otherElements.paragraph.textContent = "Part is Ordered!";
  }

  function cancelOrder(e) {
    e.target.parentElement.remove();
    nextButton.disabled = false;
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

  function clearForm() {
    Object.values(inputElements).forEach((element) => (element.value = ""));
  }

  function isEmpty() {
    Object.values(inputElements).some((element) => element.value === "");
  }
}
