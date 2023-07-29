const API_URL = "http://localhost:3030/jsonstore/tasks/";

function attachEvents() {
  document.getElementById("load-button").addEventListener("click", loadTasks);
  document.getElementById("add-button").addEventListener("click", addTask);
}

async function loadTasks(e) {
  e.preventDefault();
  await getTasks();
}

async function getTasks() {
  const tasks = await (await fetch(API_URL)).json();

  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  Object.values(tasks).forEach(({ name, _id }) => {
    const li = createElement("li", null, null, null, list);
    createElement("span", name, null, null, li);

    const removeButton = createElement("button", "Remove", null, null, li);
    removeButton.addEventListener("click", async () => {
      await fetch(`${API_URL}${_id}`, { method: "DELETE" });
      await getTasks();
    });

    const editTask = (e) => {
      const parent = e.target.parentElement;

      const span = parent.querySelector("span");
      const spanText = span.textContent;
      span.remove();

      const input = createElement("input");
      input.value = spanText;
      parent.insertBefore(input, list.querySelector("button:nth-child(1)"));

      e.target.textContent = "Submit";
      e.target.removeEventListener("click", editTask);

      e.target.addEventListener("click", async () => {
        await fetch(`${API_URL}${_id}`, {
          method: "PATCH",
          body: JSON.stringify({ name: input.value }),
        });

        await getTasks();
      });
    };

    const editButton = createElement("button", "Edit", null, null, li);
    editButton.addEventListener("click", editTask);
  });
}

async function addTask(e) {
  e.preventDefault();

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name: document.getElementById("title").value }),
  });

  await getTasks();
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

attachEvents();
