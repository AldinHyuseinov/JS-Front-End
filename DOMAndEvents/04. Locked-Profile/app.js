function lockedProfile() {
  const buttons = document.getElementsByTagName("button");

  for (let index = 1; index <= buttons.length; index++) {
    const button = buttons[index - 1];
    button.addEventListener("click", () => {
      const lockedRadio = document.querySelector(`input[value=lock][name=user${index}Locked]`);
      const hiddedFields = document.querySelector(`#user${index}HiddenFields`);

      if (button.textContent !== "Hide it") {
        if (!lockedRadio.checked) {
          hiddedFields.style.display = "block";
          button.textContent = "Hide it";
        }
      } else {
        if (!lockedRadio.checked) {
          hiddedFields.style.display = "none";
          button.textContent = "Show more";
        }
      }
    });
  }
}
