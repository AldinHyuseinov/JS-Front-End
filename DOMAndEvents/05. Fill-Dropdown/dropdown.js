function addItem() {
  const option = document.createElement("option");
  const textField = document.querySelector("#newItemText");
  const valueField = document.querySelector("#newItemValue");
  option.textContent = textField.value;
  option.value = valueField.value;
  textField.value = "";
  valueField.value = "";

  document.querySelector("#menu").appendChild(option);
}
