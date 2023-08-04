const API_URL = "http://localhost:3030/jsonstore/collections/students";

const inputElements = {
  firstName: document.querySelector("input[name='firstName']"),
  lastName: document.querySelector("input[name='lastName']"),
  facultyNumber: document.querySelector("input[name='facultyNumber']"),
  grade: document.querySelector("input[name='grade']"),
};

function attachEvents() {
  window.addEventListener("load", extractStudents);
  document.getElementById("submit").addEventListener("click", submitStudent);
}

async function extractStudents() {
  const students = await (await fetch(API_URL)).json();

  const table = document.querySelector("tbody");
  table.innerHTML = "";

  Object.values(students).forEach(({ firstName, lastName, facultyNumber, grade }) => {
    const tr = createElement("tr", null, null, null, table);

    createElement("td", firstName, null, null, tr);
    createElement("td", lastName, null, null, tr);
    createElement("td", facultyNumber, null, null, tr);
    createElement("td", grade, null, null, tr);
  });
}

async function submitStudent() {
  if (isEmpty()) {
    return;
  }

  const student = {
    firstName: inputElements.firstName.value,
    lastName: inputElements.lastName.value,
    facultyNumber: inputElements.facultyNumber.value,
    grade: inputElements.grade.value,
  };

  await fetch(API_URL, { method: "POST", body: JSON.stringify(student) });
  await extractStudents();
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
