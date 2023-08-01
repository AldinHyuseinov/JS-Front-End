function solve(input) {
  const leadersAndArmies = input.reduce((acc, curr) => {
    if (curr.includes("arrives")) {
      acc[getLeader(curr)] = {
        armies: [],
        totalArmyCount: 0,
      };
    } else if (curr.includes("+")) {
      const [armyName, armyCount] = curr.split(" + ");

      Object.keys(acc).forEach((leader) => {
        const army = acc[leader].armies.find((army) => army.armyName === armyName);

        if (army) {
          const armyCountNumber = Number(armyCount);

          army.armyCount += armyCountNumber;
          acc[leader].totalArmyCount += armyCountNumber;
        }
      });
    } else if (curr.includes("defeated")) {
      const leader = getLeader(curr);

      if (acc.hasOwnProperty(leader)) {
        delete acc[leader];
      }
    } else {
      const [leader, armyAndCount] = curr.split(": ");
      const [armyName, armyCount] = armyAndCount.split(", ");

      if (acc.hasOwnProperty(leader)) {
        const armyCountNumber = Number(armyCount);

        acc[leader].armies.push({ armyName, armyCount: armyCountNumber });
        acc[leader].totalArmyCount += armyCountNumber;
      }
    }

    return acc;
  }, {});

  Object.entries(leadersAndArmies)
    .sort(([_, { totalArmyCount: countA }], [__, { totalArmyCount: countB }]) => countB - countA)
    .forEach(([leader, { armies, totalArmyCount }]) => {
      console.log(`${leader}: ${totalArmyCount}`);
      armies
        .sort((a, b) => b.armyCount - a.armyCount)
        .forEach((army) => console.log(`>>> ${army.armyName} - ${army.armyCount}`));
    });

  function getLeader(str) {
    const leader = str.split(" ");
    // remove arrives
    leader.pop();

    return leader.join(" ");
  }
}

solve([
  "Rick Burr arrives",
  "Fergus: Wexamp, 30245",
  "Rick Burr: Juard, 50000",
  "Findlay arrives",
  "Findlay: Britox, 34540",
  "Wexamp + 6000",
  "Juard + 1350",
  "Britox + 4500",
  "Porter arrives",
  "Porter: Legion, 55000",
  "Legion + 302",
  "Rick Burr defeated",
  "Porter: Retix, 3205",
]);

solve([
  "Rick Burr arrives",
  "Findlay arrives",
  "Rick Burr: Juard, 1500",
  "Wexamp arrives",
  "Findlay: Wexamp, 34540",
  "Wexamp + 340",
  "Wexamp: Britox, 1155",
  "Wexamp: Juard, 43423",
]);
