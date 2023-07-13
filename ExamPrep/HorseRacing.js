function race(input) {
  const horses = input.shift().split("|");
  let raceFinished = false;

  input.forEach((commandString) => {
    if (raceFinished) {
      return;
    }

    const [command, ...horseNames] = commandString.split(" ");

    switch (command) {
      case "Retake":
        retakeHorse(horseNames);
        break;
      case "Trouble":
        troubleHorse(horseNames[0]);
        break;
      case "Rage":
        rageHorse(horseNames[0]);
        break;
      case "Miracle":
        miracleHorse();
        break;
      case "Finish":
        finishRace();
        raceFinished = true;
        break;
    }
  });

  function retakeHorse(horseNames) {
    const [overtakingHorse, overtakenHorse] = horseNames;
    const overtakingHorseIndex = horses.findIndex((horse) => horse === overtakingHorse);
    const overtakenHorseIndex = horses.findIndex((horse) => horse === overtakenHorse);

    if (overtakingHorseIndex < overtakenHorseIndex) {
      horses.splice(overtakenHorseIndex, 1, overtakingHorse);
      horses.splice(overtakingHorseIndex, 1, overtakenHorse);

      console.log(`${overtakingHorse} retakes ${overtakenHorse}.`);
    }
  }

  function troubleHorse(horseName) {
    if (horses[0] === horseName) {
      return;
    }

    const horseIndex = horses.findIndex((horse) => horse === horseName);
    horses.splice(horseIndex - 1, 0, horseName);
    horses.splice(horseIndex + 1, 1);

    console.log(`Trouble for ${horseName} - drops one position.`);
  }

  function rageHorse(horseName) {
    const ragedHorseIndex = horses.findIndex((horse) => horse === horseName) + 2;

    if (ragedHorseIndex - 2 === horses.length - 1) {
      return;
    }

    if (ragedHorseIndex < horses.length) {
      horses.splice(ragedHorseIndex + 1, 0, horseName);
      horses.splice(ragedHorseIndex - 2, 1);
    } else {
      const previousFirstPlaceHorse = horses[horses.length - 1];
      horses.splice(horses.length - 1, 1, horseName);
      horses.splice(horses.length - 2, 1, previousFirstPlaceHorse);
    }

    console.log(`${horseName} rages 2 positions ahead.`);
  }

  function miracleHorse() {
    const miracleHorse = horses.shift();
    horses.push(miracleHorse);

    console.log(`What a miracle - ${miracleHorse} becomes first.`);
  }

  function finishRace() {
    console.log(`${horses.join("->")}`);
    console.log(`The winner is: ${horses[horses.length - 1]}`);
  }
}

race([
  "Bella|Alexia|Sugar",
  "Rage Alexia",
  "Retake Alexia Sugar",
  "Rage Bella",
  "Trouble Bella",
  "Finish",
]);
race([
  "Onyx|Domino|Sugar|Fiona",
  "Trouble Onyx",
  "Retake Onyx Sugar",
  "Rage Domino",
  "Miracle",
  "Finish",
]);
race([
  "Fancy|Lilly",
  "Retake Lilly Fancy",
  "Trouble Lilly",
  "Trouble Lilly",
  "Finish",
  "Rage Lilly",
]);
