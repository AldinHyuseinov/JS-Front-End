function printProducts(currentStock, orderedProducts) {
  const products = {};

  for (let index = 0; index < currentStock.length; index += 2) {
    products[currentStock[index]] = Number(currentStock[index + 1]);
  }

  for (let index = 0; index < orderedProducts.length; index += 2) {
    const orderedProduct = orderedProducts[index];

    if (products.hasOwnProperty(orderedProduct)) {
      products[orderedProduct] += Number(orderedProducts[index + 1]);
    } else {
      products[orderedProduct] = Number(orderedProducts[index + 1]);
    }
  }

  for (const product in products) {
    console.log(`${product} -> ${products[product]}`);
  }
}

printProducts(
  ["Chips", "5", "CocaCola", "9", "Bananas", "14", "Pasta", "4", "Beer", "2"],
  ["Flour", "44", "Oil", "12", "Pasta", "7", "Tomatoes", "70", "Bananas", "30"]
);
