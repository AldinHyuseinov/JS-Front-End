function createShoppingList(input) {
  const groceries = input.shift().split("!");
  // Removes last command, which is Go Shopping!
  input.pop();

  const commandParser = {
    Urgent: (item) => !groceries.includes(item) && groceries.unshift(item),
    Unnecessary: (item) => groceries.includes(item) && groceries.splice(groceries.indexOf(item), 1),
    Correct: ([oldItem, newItem]) =>
      groceries.includes(oldItem) && groceries.splice(groceries.indexOf(oldItem), 1, newItem),
    Rearrange: (item) =>
      groceries.includes(item) &&
      groceries.splice(groceries.length, 0, groceries.splice(groceries.indexOf(item), 1)[0]),
  };

  input.forEach((commandString) => {
    const [command, ...items] = commandString.split(" ");
    items.length === 1 ? commandParser[command](items[0]) : commandParser[command](items);
  });

  console.log(`${groceries.join(", ")}`);
}

createShoppingList([
  "Tomatoes!Potatoes!Bread",
  "Unnecessary Milk",
  "Urgent Tomatoes",
  "Go Shopping!",
]);

createShoppingList([
  "Milk!Pepper!Salt!Water!Banana",
  "Urgent Salt",
  "Unnecessary Grapes",
  "Correct Pepper Onion",
  "Rearrange Milk",
  "Correct Tomatoes Potatoes",
  "Go Shopping!",
]);
