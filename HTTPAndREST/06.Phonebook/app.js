function attachEvents() {
  document.getElementById("btnLoad").addEventListener("click", handlePhonebookLoading);
  document.getElementById("btnCreate").addEventListener("click", handleCreateEntry);
}

async function handlePhonebookLoading() {
  const phonebook = document.getElementById("phonebook");
  phonebook.innerHTML = "";

  Object.values(await fetchData()).forEach(({ person, phone }) =>
    phonebook.appendChild(createContact(person, phone))
  );
}

async function handleCreateEntry() {
  const person = document.getElementById("person");
  const phone = document.getElementById("phone");

  await fetchData("post", {
    person: person.value,
    phone: phone.value,
  });

  clearFields(person, phone);

  await handlePhonebookLoading();
}

async function handleDeleteEntry(event) {
  const [personString, phoneString] = event.target.parentElement.firstChild.textContent.split(": ");

  event.target.parentElement.remove();

  const key = Object.values(await fetchData()).find(
    ({ person, phone }) => person === personString && phone === phoneString
  )._id;

  await fetchData("delete", null, `/${key}`);
}

async function fetchData(method, body, url) {
  const baseUrl = "http://localhost:3030/jsonstore/phonebook";

  if (!method) {
    return await (await fetch(baseUrl)).json();
  }

  const options = { method };

  body && (options.body = JSON.stringify(body));

  await fetch(`${baseUrl}${url || ""}`, options);
}

function createContact(person, phone) {
  const li = document.createElement("li");
  li.textContent = `${person}: ${phone}`;
  li.appendChild(createDeleteButton());

  return li;
}

function createDeleteButton() {
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.addEventListener("click", handleDeleteEntry);

  return button;
}

function clearFields(...fields) {
  fields.forEach((field) => (field.value = ""));
}

attachEvents();
