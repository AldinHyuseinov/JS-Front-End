class Storage {
  capacity;
  storage = [];
  totalCost = 0;

  constructor(capacity) {
    this.capacity = capacity;
  }

  addProduct(product) {
    this.storage.push(product);
    this.capacity -= product.quantity;
    this.totalCost += product.price * product.quantity;
  }

  getProducts() {
    return this.storage.map((product) => JSON.stringify(product)).join("\n");
  }
}

function testStorageClass() {
  let productOne = { name: "Cucamber", price: 1.5, quantity: 15 };
  let productTwo = { name: "Tomato", price: 0.9, quantity: 25 };
  let productThree = { name: "Bread", price: 1.1, quantity: 8 };
  let storage = new Storage(50);
  storage.addProduct(productOne);
  storage.addProduct(productTwo);
  storage.addProduct(productThree);
  console.log(storage.getProducts());
  console.log(storage.capacity);
  console.log(storage.totalCost);

  productOne = { name: "Tomato", price: 0.9, quantity: 19 };
  productTwo = { name: "Potato", price: 1.1, quantity: 10 };
  storage = new Storage(30);
  storage.addProduct(productOne);
  storage.addProduct(productTwo);
  console.log(storage.totalCost);
}

testStorageClass();
