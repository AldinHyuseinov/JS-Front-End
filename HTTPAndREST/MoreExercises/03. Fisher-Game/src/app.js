import { fetchData, handleNavAuthButtons } from "./common.js";

handleNavAuthButtons();

const addButton = document.querySelector(".add");
addButton.addEventListener("click", addCatch);

if (sessionStorage.length >= 1) {
  addButton.disabled = false;
} else {
  addButton.disabled = true;
}

document.querySelector(".load").addEventListener("click", async () => {
  const allCatches = await (await fetchData("get", null, "/data/catches")).json();

  await createCatches(...allCatches);
});

async function addCatch() {
  await fetchData("post", getInput(document.querySelector("#addForm fieldset")), "/data/catches");
}

async function createCatches(...catches) {
  const catchesDiv = document.getElementById("catches");
  catchesDiv.innerHTML = "";

  for (const catchName of catches) {
    const div = document.createElement("div");
    div.classList.add("catch");

    div.appendChild(createLabel("Angler"));
    div.appendChild(createInput("text", "angler", catchName.angler));

    div.appendChild(createLabel("Weight"));
    div.appendChild(createInput("text", "weight", catchName.weight));

    div.appendChild(createLabel("Species"));
    div.appendChild(createInput("text", "species", catchName.species));

    div.appendChild(createLabel("Location"));
    div.appendChild(createInput("text", "location", catchName.location));

    div.appendChild(createLabel("Bait"));
    div.appendChild(createInput("text", "bait", catchName.bait));

    div.appendChild(createLabel("Capture Time"));
    div.appendChild(createInput("number", "captureTime", catchName.captureTime));

    div.appendChild(await createButton("update", catchName._id, "Update"));
    div.appendChild(await createButton("delete", catchName._id, "Delete"));

    catchesDiv.appendChild(div);
  }
}

function createLabel(textContent) {
  const label = document.createElement("label");
  label.textContent = textContent;

  return label;
}

function createInput(type, className, value) {
  const input = document.createElement("input");
  input.type = type;
  input.classList.add(className);
  input.value = value;

  return input;
}

async function createButton(className, id, textContent) {
  const button = document.createElement("button");
  button.classList.add(className);
  button.setAttribute("data-id", id);
  button.textContent = textContent;

  const isOwner = await owner(button);
  if (!isOwner) {
    button.disabled = true;
  }

  button.addEventListener("click", handleButtonEvent);

  return button;
}

async function owner(button) {
  if (sessionStorage.length === 0) {
    return false;
  }

  const fish = await (
    await fetchData("get", null, `/data/catches/${button.getAttribute("data-id")}`)
  ).json();

  if (fish._ownerId !== sessionStorage.getItem("id")) {
    return false;
  }

  return true;
}

async function handleButtonEvent(event) {
  const targetButton = event.target;
  const fishId = targetButton.getAttribute("data-id");

  if (targetButton.textContent === "Update") {
    await updateCatch(targetButton.parentElement, fishId);
    return;
  }

  await fetchData("DELETE", null, `/data/catches/${fishId}`);
}

async function updateCatch(catchElement, id) {
  await fetchData("PUT", getInput(catchElement), `/data/catches/${id}`);
}

function getInput(parentElement) {
  const angler = parentElement.querySelector(".angler").value;
  const weight = parentElement.querySelector(".weight").value;
  const species = parentElement.querySelector(".species").value;
  const location = parentElement.querySelector(".location").value;
  const bait = parentElement.querySelector(".bait").value;
  const captureTime = parentElement.querySelector(".captureTime").value;

  return { angler, weight, species, location, bait, captureTime };
}
