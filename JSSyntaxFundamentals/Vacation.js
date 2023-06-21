function calculatePrice(groupSize, typeOfGroup, dayOfTheWeek) {
  let totalPrice = 0;

  switch (typeOfGroup) {
    case "Students":
      switch (dayOfTheWeek) {
        case "Friday":
          totalPrice += groupSize * 8.45;
          break;

        case "Saturday":
          totalPrice += groupSize * 9.8;
          break;

        case "Sunday":
          totalPrice += groupSize * 10.46;
          break;
      }

      if (groupSize >= 30) {
        totalPrice -= totalPrice * 0.15;
      }
      break;

    case "Business":
      if (groupSize >= 100) {
        groupSize -= 10;
      }

      switch (dayOfTheWeek) {
        case "Friday":
          totalPrice += groupSize * 10.9;
          break;

        case "Saturday":
          totalPrice += groupSize * 15.6;
          break;

        case "Sunday":
          totalPrice += groupSize * 16;
          break;
      }
      break;

    case "Regular":
      switch (dayOfTheWeek) {
        case "Friday":
          totalPrice += groupSize * 15;
          break;

        case "Saturday":
          totalPrice += groupSize * 20;
          break;

        case "Sunday":
          totalPrice += groupSize * 22.5;
          break;
      }

      if (groupSize >= 10 && groupSize <= 20) {
        totalPrice -= totalPrice * 0.5;
      }
      break;
  }

  console.log(`Total price: ${totalPrice.toFixed(2)}`);
}

calculatePrice(40, "Regular", "Saturday");
