export function handleNavAuthButtons() {
  const logout = document.getElementById("logout");
  const login = document.getElementById("login");
  const register = document.getElementById("register");
  const welcome = document.querySelector(".email span");

  if (sessionStorage.length >= 1) {
    logout.style.display = "block";
    login.style.display = "none";
    register.style.display = "none";
    welcome.textContent = sessionStorage.getItem("email");
    return;
  }

  logout.style.display = "none";
  login.style.display = "inline";
  register.style.display = "inline";
  welcome.textContent = "guest";
}

export async function fetchData(method, body, url) {
  const baseUrl = "http://localhost:3030";

  const options = { method, headers: {} };
  body && (options.body = JSON.stringify(body));

  const token = sessionStorage.getItem("accessToken");
  if (token) {
    options.headers["X-Authorization"] = token;
  }

  return fetch(`${baseUrl}${url || ""}`, options);
}

export function storeUserData(email, token, id) {
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("accessToken", token);
  sessionStorage.setItem("id", id);
  location.href = "index.html";
}

document.getElementById("logout").addEventListener("click", async () => {
  await fetchData("get", null, "/users/logout");
  sessionStorage.clear();
  location.href = "index.html";
});
