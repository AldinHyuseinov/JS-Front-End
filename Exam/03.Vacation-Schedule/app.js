const API_URL = "http://localhost:3030/jsonstore/tasks/";

const buttonElements = {
  loadButton: document.getElementById("load-vacations"),
  addButton: document.getElementById("add-vacation"),
  editButton: document.getElementById("edit-vacation"),
};

buttonElements.loadButton.addEventListener("click", loadVacations);
buttonElements.addButton.addEventListener("click", addVacation);
buttonElements.editButton.addEventListener("click", editVacation);

const inputElements = {
  name: document.getElementById("name"),
  numDays: document.getElementById("num-days"),
  fromDate: document.getElementById("from-date"),
};

async function loadVacations() {
  const vacations = await (await fetch(API_URL)).json();
  console.log(vacations);
  const list = document.getElementById("list");
  list.innerHTML = "";

  Object.values(vacations).forEach(({ date, days, name, _id }) => {
    const container = createElement("div", null, ["container"], _id, list);
    createElement("h2", name, null, null, container);
    createElement("h3", date, null, null, container);
    createElement("h3", days, null, null, container);

    const changeButton = createElement("button", "Change", ["change-btn"], null, container);
    changeButton.addEventListener("click", (e) => {
      e.target.parentElement.remove();

      inputElements.name.value = name;
      inputElements.numDays.value = days;
      inputElements.fromDate.value = date;
      buttonElements.editButton.setAttribute("data-id", _id);
      buttonElements.editButton.disabled = false;
      buttonElements.addButton.disabled = true;
    });

    const doneButton = createElement("button", "Done", ["done-btn"], null, container);
    doneButton.addEventListener("click", async (e) => {
      await fetch(`${API_URL}${e.target.parentElement.id}`, { method: "DELETE" });
      await loadVacations();
    });
  });

  buttonElements.editButton.disabled = true;
}

async function addVacation(e) {
  e.preventDefault();

  const vacation = {
    name: inputElements.name.value,
    days: inputElements.numDays.value,
    date: inputElements.fromDate.value,
  };

  await fetch(API_URL, { method: "POST", body: JSON.stringify(vacation) });
  clearForm();
  await loadVacations();
}

async function editVacation(e) {
  e.preventDefault();

  const editedVacation = {
    name: inputElements.name.value,
    days: inputElements.numDays.value,
    date: inputElements.fromDate.value,
  };

  await fetch(`${API_URL}${e.target.getAttribute("data-id")}`, {
    method: "PUT",
    body: JSON.stringify(editedVacation),
  });

  await loadVacations();
  buttonElements.editButton.disabled = true;
  buttonElements.addButton.disabled = false;
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
