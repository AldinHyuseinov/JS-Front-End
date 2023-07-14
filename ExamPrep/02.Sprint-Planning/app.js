window.addEventListener("load", solve);

function solve() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const label = document.getElementById("label");
  const points = document.getElementById("points");
  const assignee = document.getElementById("assignee");
  const createButton = document.getElementById("create-task-btn");

  let pointCounter = 0;

  createButton.addEventListener("click", () => {
    if (!isEmpty()) {
      document.getElementById("tasks-section").appendChild(createTaskCard());

      deleteInputFieldValues();

      createDeleteButtonFunctionality();
    }
  });

  function isEmpty() {
    const empty =
      title.value === "" ||
      description.value === "" ||
      label.value === "" ||
      points.value === "" ||
      assignee.value === "";

    return empty;
  }

  function createTaskCard() {
    const taskCards = document.getElementsByClassName("task-card");

    const taskCard = document.createElement("article");
    taskCard.id = `task-${taskCards.length === 0 ? 1 : taskCards.length + 1}`;
    taskCard.classList.add("task-card");

    taskCard.appendChild(createTaskCardLabel());
    taskCard.appendChild(createTaskCardTitle());
    taskCard.appendChild(createTaskCardDescription());
    taskCard.appendChild(createTaskCardPoints());
    taskCard.appendChild(createTaskCardAssignee());
    taskCard.appendChild(createTaskCardActions());

    return taskCard;
  }

  function createTaskCardLabel() {
    const taskCardLabel = document.createElement("div");
    taskCardLabel.classList.add("task-card-label", checkLabel());
    taskCardLabel.innerHTML = `${label.value} ${
      checkLabel() === "feature"
        ? "&#8865;"
        : checkLabel() === "low-priority"
        ? "&#9737;"
        : " &#9888;"
    }`;

    return taskCardLabel;
  }

  function createTaskCardTitle() {
    const taskCardTitle = document.createElement("h3");
    taskCardTitle.classList.add("task-card-title");
    taskCardTitle.textContent = title.value;

    return taskCardTitle;
  }

  function createTaskCardDescription() {
    const taskCardDescription = document.createElement("p");
    taskCardDescription.classList.add("task-card-description");
    taskCardDescription.textContent = description.value;

    return taskCardDescription;
  }

  function createTaskCardPoints() {
    const taskCardPoints = document.createElement("div");
    taskCardPoints.classList.add("task-card-points");
    taskCardPoints.textContent = `Estimated at ${points.value} pts`;

    pointCounter += Number(points.value);
    updateTotalPoints();

    return taskCardPoints;
  }

  function createTaskCardAssignee() {
    const taskCardAssignee = document.createElement("div");
    taskCardAssignee.classList.add("task-card-assignee");
    taskCardAssignee.textContent = `Assigned to: ${assignee.value}`;

    return taskCardAssignee;
  }

  function createTaskCardActions() {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    const taskCardActions = document.createElement("div");
    taskCardActions.classList.add("task-card-actions");
    taskCardActions.appendChild(deleteButton);

    return taskCardActions;
  }

  function createDeleteButtonFunctionality() {
    const deleteTaskButton = document.getElementById("delete-task-btn");
    const taskCardId = getLastTaskCardCreated().id;
    const button = document.querySelector(`#${taskCardId} .task-card-actions button`);

    button.addEventListener("click", () => {
      deleteTaskButton.disabled = false;
      disableInputs();
      assignValues(taskCardId);
    });

    deleteTaskButton.addEventListener("click", () => {
      Array.from(document.getElementsByClassName("task-card"))
        .find((taskCard) => taskCard.id === document.getElementById("task-id").value)
        .remove();

      deleteTaskButton.disabled = true;
      enableInputs();

      pointCounter -= Number(points.value);
      updateTotalPoints();

      deleteInputFieldValues();
    });
  }

  function assignValues(taskCardId) {
    document.getElementById("task-id").value = taskCardId;

    label.value = document
      .querySelector(`#${taskCardId} > .task-card-label`)
      .textContent.split(/\s+(?=\S*$)/gm)[0];

    title.value = document.querySelector(`#${taskCardId} > .task-card-title`).textContent;

    description.value = document.querySelector(
      `#${taskCardId} > .task-card-description`
    ).textContent;

    points.value = document
      .querySelector(`#${taskCardId} > .task-card-points`)
      .textContent.split(/\D+/gm)[1];

    assignee.value = document
      .querySelector(`#${taskCardId} > .task-card-assignee`)
      .textContent.split(": ")[1];
  }

  function updateTotalPoints() {
    document.getElementById("total-sprint-points").textContent = `Total Points ${pointCounter}pts`;
  }

  function getLastTaskCardCreated() {
    const taskCards = document.getElementsByClassName("task-card");

    return taskCards[taskCards.length - 1];
  }

  function checkLabel() {
    if (label.value === "Feature") {
      return "feature";
    }

    if (label.value === "Low Priority Bug") {
      return "low-priority";
    }

    return "high-priority";
  }

  function deleteInputFieldValues() {
    title.value = "";
    description.value = "";
    label.value = "";
    points.value = "";
    assignee.value = "";
  }

  function disableInputs() {
    title.disabled = true;
    description.disabled = true;
    label.disabled = true;
    points.disabled = true;
    assignee.disabled = true;
    createButton.disabled = true;
  }

  function enableInputs() {
    title.disabled = false;
    description.disabled = false;
    label.disabled = false;
    points.disabled = false;
    assignee.disabled = false;
    createButton.disabled = false;
  }
}
