import { fetchData, handleNavAuthButtons, storeUserData } from "./common.js";

handleNavAuthButtons();

document.querySelector("#login button").addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.querySelector("input[name='email'");
  const password = document.querySelector("input[name='password'");
  const payload = { email: email.value, password: password.value };

  const response = await (await fetchData("post", payload, "/users/login")).json();

  if (response.code === 403) {
    document.querySelector(".notification").textContent = response.message;
  } else {
    storeUserData(email.value, response.accessToken, response._id);
  }
});
