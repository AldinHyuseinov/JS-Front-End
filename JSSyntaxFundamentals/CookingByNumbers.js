function cook(number, ...operations) {
  operations.forEach((operation) => {
    switch (operation) {
      case "chop":
        number /= 2;
        break;

      case "dice":
        number = Math.sqrt(number);
        break;

      case "spice":
        number += 1;
        break;

      case "bake":
        number *= 3;
        break;

      case "fillet":
        number -= number * 0.2;
        break;
    }
    
    console.log(number);
  });
}

cook("9", "dice", "spice", "chop", "bake", "fillet");
