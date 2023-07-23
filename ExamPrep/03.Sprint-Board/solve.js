function attachEvents() {
  document.getElementById("load-board-btn").addEventListener("click", loadBoard);
  document.getElementById("create-task-btn").addEventListener("click", addTask);
}

async function loadBoard() {
  const tasks = await fetchData();

  Array.from(document.getElementsByClassName("task-list")).forEach((task) => (task.innerHTML = ""));

  Object.values(tasks).forEach((task) => createTask(task));
}

async function addTask() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  await fetchData("post", { title: title.value, description: description.value, status: "ToDo" });
  clearFields(title, description);
  await loadBoard();
}

function createTask({ title, description, status, _id }) {
  const h3 = document.createElement("h3");
  h3.textContent = title;

  const p = document.createElement("p");
  p.textContent = description;

  const li = document.createElement("li");
  li.classList.add("task");
  li.appendChild(h3);
  li.appendChild(p);
  li.appendChild(createButton(status, _id));

  document
    .querySelector(`#${status.toLowerCase().split(" ").join("-")}-section .task-list`)
    .appendChild(li);
}

async function handleTaskStatus(event) {
  const buttonTextContent = event.target.textContent;
  const statusToMoveTo = buttonTextContent !== "Close" && buttonTextContent.split("Move to ")[1];

  await fetchData(
    statusToMoveTo ? "PATCH" : "DELETE",
    statusToMoveTo ? { status: statusToMoveTo } : null,
    event.target.value
  );

  await loadBoard();
}

function createButton(status, id) {
  const buttonTextContent = {
    ToDo: "Move to In Progress",
    "In Progress": "Move to Code Review",
    "Code Review": "Move to Done",
    Done: "Close",
  };

  const button = document.createElement("button");
  button.textContent = buttonTextContent[status];
  button.value = id;
  button.addEventListener("click", handleTaskStatus);

  return button;
}

async function fetchData(method, body, url) {
  const baseUrl = "http://localhost:3030/jsonstore/tasks/";

  if (!method) {
    return (await fetch(baseUrl)).json();
  }

  const options = { method };

  body && (options.body = JSON.stringify(body));

  fetch(`${baseUrl}${url || ""}`, options);
}

function clearFields(...fields) {
  fields.forEach((field) => (field.value = ""));
}

attachEvents();
