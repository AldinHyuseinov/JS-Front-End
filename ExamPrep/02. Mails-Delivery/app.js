function solve() {
  const inputElements = {
    recipient: document.getElementById("recipientName"),
    title: document.getElementById("title"),
    message: document.getElementById("message"),
  };

  document.getElementById("add").addEventListener("click", addMail);
  document.getElementById("reset").addEventListener("click", (e) => {
    e.preventDefault();
    clearInputs();
  });

  function addMail(e) {
    e.preventDefault();

    if (isEmpty()) {
      return;
    }

    const list = document.getElementById("list");
    const li = createElement("li", null, null, null, list);
    createElement("h4", `Title: ${inputElements.title.value}`, null, null, li);
    createElement("h4", `Recipient Name: ${inputElements.recipient.value}`, null, null, li);
    createElement("span", inputElements.message.value, null, null, li);
    const listActions = createElement("div", null, null, "list-actions", li);

    const sendButton = createElement("button", "Send", null, "send", listActions);
    sendButton.type = "submit";
    sendButton.addEventListener("click", sendMail);

    const deleteButton = createElement("button", "Delete", null, "delete", listActions);
    deleteButton.type = "submit";
    deleteButton.addEventListener("click", deleteMail);

    clearInputs();
  }

  function sendMail(e) {
    e.preventDefault();

    const li = e.target.parentElement.parentElement;
    e.target.remove();
    document.querySelector(".sent-list").appendChild(li);
  }

  function deleteMail(e) {
    e.preventDefault();

    const parentLi = e.target.parentElement.parentElement;
    const h4Arr = Array.from(parentLi.querySelectorAll("h4"));
    parentLi.remove();

    const deleteList = document.querySelector(".delete-list");
    const li = createElement("li", null, null, null, deleteList);

    createElement("span", `To: ${h4Arr[0].textContent.split(": ")[1]} `, null, null, li);
    createElement("span", `Title: ${h4Arr[1].textContent.split(": ")[1]}`, null, null, li);
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

  function clearInputs() {
    Object.values(inputElements).forEach((element) => (element.value = ""));
  }
}

solve();
