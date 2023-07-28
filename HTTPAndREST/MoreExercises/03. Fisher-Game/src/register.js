import { fetchData, handleNavAuthButtons, storeUserData } from "./common.js";

handleNavAuthButtons();

document.querySelector("#register button").addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.querySelector("input[name='email'");
  const password = document.querySelector("input[name='password'");
  const repeat = document.querySelector("input[name='rePass'");
  const payload = { email: email.value, password: password.value, repeat: repeat.value };

  const response = await fetchData("post", payload, "/users/register");
  const json = await response.json();

  if (response.status === 200) {
    storeUserData(email.value, json.accessToken, json._id);
  } else {
    document.querySelector(".notification").textContent = json.message;
  }
});
