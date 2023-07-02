function solve() {
  const buttons = document.getElementsByTagName("button");
  const textareas = document.getElementsByTagName("textarea");

  buttons[0].addEventListener("click", () => {
    const furniture = JSON.parse(textareas[0].value);

    furniture.forEach((item) => {
      const tableDataImage = document.createElement("td");
      const image = document.createElement("img");
      image.src = item.img;
      tableDataImage.appendChild(image);

      const tableDataName = document.createElement("td");
      const nameParagraph = document.createElement("p");
      nameParagraph.textContent = item.name;
      tableDataName.appendChild(nameParagraph);

      const tableDataPrice = document.createElement("td");
      const priceParagraph = document.createElement("p");
      priceParagraph.textContent = item.price;
      tableDataPrice.appendChild(priceParagraph);

      const tableDataDecFactor = document.createElement("td");
      const decFactorParagraph = document.createElement("p");
      decFactorParagraph.textContent = item.decFactor;
      tableDataDecFactor.appendChild(decFactorParagraph);

      const tableDataMark = document.createElement("td");
      const markElement = document.createElement("input");
      markElement.type = "checkbox";
      tableDataMark.appendChild(markElement);

      const tableRow = document.createElement("tr");
      tableRow.appendChild(tableDataImage);
      tableRow.appendChild(tableDataName);
      tableRow.appendChild(tableDataPrice);
      tableRow.appendChild(tableDataDecFactor);
      tableRow.appendChild(tableDataMark);

      document.getElementsByTagName("tbody")[0].appendChild(tableRow);
    });
  });

  buttons[1].addEventListener("click", () => {
    const furniture = document.querySelectorAll("tbody tr");
    const boughtFurniture = [];
    let totalPrice = 0;
    let totalDecFactor = 0;

    for (let index = 1; index < furniture.length; index++) {
      const tableDatas = furniture[index].children;

      const checkbox = tableDatas[tableDatas.length - 1].firstChild;

      if (checkbox.checked) {
        boughtFurniture.push(tableDatas[1].firstChild.textContent);
        totalPrice += Number(tableDatas[2].firstChild.textContent);
        totalDecFactor += Number(tableDatas[3].firstChild.textContent);
      }
    }

    //prettier-ignore
    textareas[1].textContent = 
   `Bought furniture: ${boughtFurniture.join(", ")}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${totalDecFactor / boughtFurniture.length}`;
  });
}
