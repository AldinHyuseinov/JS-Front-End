function calculatePrice(fruit, weight, pricePerKg) {
  console.log(
    `I need $${((weight / 1000) * pricePerKg).toFixed(2)} to buy ${(
      weight / 1000
    ).toFixed(2)} kilograms ${fruit}.`
  );
}

calculatePrice("apple", 1563, 2.35);
