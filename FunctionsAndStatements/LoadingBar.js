function printLoadingBar(number) {
  const progress = number / 10;

  const loadingBar = () => {
    return `[${"%".repeat(progress)}${".".repeat(10 - progress)}]`;
  };

  if (progress === 10) {
    console.log("100% Complete!");
    console.log(loadingBar());
  } else {
    console.log(`${number}% ${loadingBar()}`);
    console.log("Still loading...");
  }
}

printLoadingBar(50);
