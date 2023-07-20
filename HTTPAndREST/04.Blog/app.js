function attachEvents() {
  document.getElementById("btnLoadPosts").addEventListener("click", handlePostsLoading);
  document.getElementById("btnViewPost").addEventListener("click", handleComments);
}

async function handlePostsLoading() {
  const postsSelect = document.getElementById("posts");

  Object.entries(await fetchData("/posts")).forEach(([key, { title }]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = title;

    postsSelect.appendChild(option);
  });
}

async function handleComments() {
  const selectedOption = Array.from(document.getElementsByTagName("option")).find(
    (option) => option.selected
  );

  document.getElementById("post-title").textContent = selectedOption.textContent;
  document.getElementById("post-body").textContent = Object.entries(await fetchData("/posts")).find(
    (posts) => posts[0] === selectedOption.value
  )[1].body;

  const commentsOnPost = Object.values(await fetchData("/comments")).filter(
    ({ postId }) => selectedOption.value === postId
  );

  const commentSection = document.getElementById("post-comments");
  commentSection.innerHTML = "";

  commentsOnPost.forEach(({ id, text }) => {
    const li = document.createElement("li");
    li.id = id;
    li.textContent = text;

    commentSection.appendChild(li);
  });
}

async function fetchData(url) {
  return await (await fetch(`http://localhost:3030/jsonstore/blog${url}`)).json();
}

attachEvents();
