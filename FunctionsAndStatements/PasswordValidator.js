function checkPassword(password) {
  const errorMessages = [];

  if (password.length < 6 || password.length > 10) {
    errorMessages.push("Password must be between 6 and 10 characters");
  }

  let matches = password.match(/[^A-Za-z0-9]/gm);

  if (matches !== null) {
    errorMessages.push("Password must consist only of letters and digits");
  }

  matches = password.match(/[0-9]/gm);

  if (matches === null || matches.length < 2) {
    errorMessages.push("Password must have at least 2 digits");
  }

  if (errorMessages.length === 0) {
    console.log("Password is valid");
  } else {
    errorMessages.forEach((message) => console.log(message));
  }
}

checkPassword("Pa$s$s");
