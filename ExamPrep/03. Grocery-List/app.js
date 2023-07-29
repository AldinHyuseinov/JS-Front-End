const API_URL = "http://localhost:3030/jsonstore/grocery/";

document.getElementById("load-product").addEventListener("click", loadProducts);
document.getElementById("add-product").addEventListener("click", addProduct);

const inputElements = {
  product: document.getElementById("product"),
  count: document.getElementById("count"),
  price: document.getElementById("price"),
};

async function loadProducts(e) {
  e.preventDefault();
  await getProducts();
}

async function getProducts() {
  const products = await (await fetch(API_URL)).json();

  const table = document.getElementById("tbody");
  table.innerHTML = "";

  Object.values(products).forEach(({ count, price, product, _id }) => {
    const tr = createElement("tr", null, null, null, table);
    createElement("td", product, ["name"], null, tr);
    createElement("td", count, ["count-product"], null, tr);
    createElement("td", price, ["count-price"], null, tr);

    const buttons = createElement("td", null, ["btn"], null, tr);

    const updateButton = createElement("button", "Update", ["update"], null, buttons);
    updateButton.addEventListener("click", () => {
      inputElements.product.value = product;
      inputElements.count.value = count;
      inputElements.price.value = price;

      const formUpdateButton = document.getElementById("update-product");
      formUpdateButton.disabled = false;
      formUpdateButton.setAttribute("data-product-id", _id);
      formUpdateButton.addEventListener("click", updateProduct);
    });

    const deleteButton = createElement("button", "Delete", ["delete"], null, buttons);
    deleteButton.addEventListener("click", async () => {
      await fetch(`${API_URL}${_id}`, {
        method: "DELETE",
      });
      await getProducts();
    });
  });
}

async function addProduct(e) {
  e.preventDefault();

  const productToAdd = {
    product: inputElements.product.value,
    count: inputElements.count.value,
    price: inputElements.price.value,
  };

  await fetch(API_URL, { method: "POST", body: JSON.stringify(productToAdd) });
  await getProducts();
}

async function updateProduct(e) {
  const updatedProduct = {
    product: inputElements.product.value,
    count: inputElements.count.value,
    price: inputElements.price.value,
  };
  await fetch(`${API_URL}${e.target.getAttribute("data-product-id")}`, {
    method: "PATCH",
    body: JSON.stringify(updatedProduct),
  });
  await getProducts();
}

function createElement(type, textContent, classes, id, parent) {
  const element = document.createElement(type);

  if (textContent) {
    element.textContent = textContent;
  }

  if (classes && classes.length > 0) {
    element.classList.add(...classes);
  }

  if (id) {
    element.setAttribute("id", id);
  }

  if (parent) {
    parent.appendChild(element);
  }

  return element;
}
