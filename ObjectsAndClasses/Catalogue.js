function createCatalogue(products) {
  const catalogue = {};

  products.forEach((product) => {
    const [productName, productPrice] = product.split(" : ");
    catalogue[productName] = productPrice;
  });

  let letter = "-1";

  Object.entries(catalogue)
    .sort(
      (firstProduct, secProduct) =>
        (firstProduct[0].toLowerCase() > secProduct[0].toLowerCase()) -
        (firstProduct[0].toLowerCase() < secProduct[0].toLowerCase())
    )
    .forEach(([productName, productPrice]) => {
      const firstLetter = productName.charAt(0);

      if (letter !== firstLetter) {
        letter = firstLetter;
        console.log(letter);
      }
      console.log(`  ${productName}: ${productPrice}`);
    });
}

createCatalogue([
  "Appricot : 20.4",
  "Fridge : 1500",
  "TV : 1499",
  "Deodorant : 10",
  "Boiler : 300",
  "Apple : 1.25",
  "Anti-Bug Spray : 15",
  "T-Shirt : 10",
]);
