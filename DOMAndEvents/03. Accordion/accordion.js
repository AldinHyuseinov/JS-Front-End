function toggle() {
  const spanElement = document.getElementsByClassName("button")[0];
  const extraElement = document.getElementById("extra");

  if (spanElement.textContent === "More") {
    spanElement.textContent = "Less";
    extraElement.style.display = "block";
  } else {
    spanElement.textContent = "More";
    extraElement.style.display = "none";
  }
}
