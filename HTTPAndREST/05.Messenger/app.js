function attachEvents() {
  document.getElementById("submit").addEventListener("click", handleSubmitMessage);
  document.getElementById("refresh").addEventListener("click", handleRefresh);
}

async function handleSubmitMessage() {
  await fetchData({
    author: document.querySelector("input[name='author']").value,
    content: document.querySelector("input[name='content']").value,
  });
}

async function handleRefresh() {
  document.getElementById("messages").textContent = Object.values(await fetchData())
    .map(({ author, content }) => `${author}: ${content}\n`)
    .join("")
    .trimEnd();
}

async function fetchData(body) {
  const url = "http://localhost:3030/jsonstore/messenger";

  if (body) {
    await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
    });

    return;
  }

  return await (await fetch(url)).json();
}

attachEvents();
