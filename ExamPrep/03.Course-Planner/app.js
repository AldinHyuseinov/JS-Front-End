const API_URL = "http://localhost:3030/jsonstore/tasks/";

const buttonSelectors = {
  addButton: document.getElementById("add-course"),
  editButton: document.getElementById("edit-course"),
};

document.getElementById("load-course").addEventListener("click", loadCourses);
buttonSelectors.addButton.addEventListener("click", addCourse);
buttonSelectors.editButton.addEventListener("click", editCourse);

const inputSelectors = {
  courseTitle: document.getElementById("course-name"),
  courseType: document.getElementById("course-type"),
  courseDescription: document.getElementById("description"),
  teacherName: document.getElementById("teacher-name"),
};

let allCourses;

async function loadCourses() {
  const courses = await (await fetch(API_URL)).json();
  allCourses = courses;

  const list = document.getElementById("list");
  list.innerHTML = "";

  Object.values(courses).forEach((course) => {
    const container = createElement("div", null, ["container"], null, list);

    createElement("h2", course.title, null, null, container);
    createElement("h3", course.teacher, null, null, container);
    createElement("h3", course.type, null, null, container);
    createElement("h4", course.description, null, null, container);

    const editButton = createElement("button", "Edit Course", ["edit-btn"], course._id, container);
    editButton.addEventListener("click", edit);

    const finishButton = createElement(
      "button",
      "Finish Course",
      ["finish-btn"],
      course._id,
      container
    );
    finishButton.addEventListener("click", finishCourse);
  });
}

async function addCourse(e) {
  e.preventDefault();

  await fetch(API_URL, { method: "POST", body: JSON.stringify(getInputValues()) });
  Object.values(inputSelectors).forEach((selector) => (selector.value = ""));

  await loadCourses();
}

async function editCourse(e) {
  e.preventDefault();

  await fetch(`${API_URL}${e.target.getAttribute("data-id")}`, {
    method: "PUT",
    body: JSON.stringify(getInputValues()),
  });

  await loadCourses();
  buttonSelectors.addButton.disabled = false;
  buttonSelectors.editButton.disabled = true;
  buttonSelectors.editButton.removeAttribute("data-id");
  Object.values(inputSelectors).forEach((selector) => (selector.value = ""));
}

function edit(e) {
  const course = Object.values(allCourses).find((course) => course._id === e.target.id);
  e.target.parentElement.remove();

  inputSelectors.courseTitle.value = course.title;
  inputSelectors.courseType.value = course.type;
  inputSelectors.courseDescription.value = course.description;
  inputSelectors.teacherName.value = course.teacher;

  buttonSelectors.addButton.disabled = true;
  buttonSelectors.editButton.disabled = false;
  buttonSelectors.editButton.setAttribute("data-id", course._id);
}

async function finishCourse(e) {
  await fetch(`${API_URL}${e.target.id}`, { method: "DELETE" });
  await loadCourses();
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

function getInputValues() {
  return {
    title: inputSelectors.courseTitle.value,
    type: inputSelectors.courseType.value,
    description: inputSelectors.courseDescription.value,
    teacher: inputSelectors.teacherName.value,
  };
}
