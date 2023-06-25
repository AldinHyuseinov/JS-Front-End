function printTowns(towns) {
  towns.forEach((town) => {
    const info = town.split(" | ");

    console.log({
      town: info[0],
      latitude: Number(info[1]).toFixed(2),
      longitude: Number(info[2]).toFixed(2),
    });
  });
}

printTowns(["Sofia | 42.696552 | 23.32601", "Beijing | 39.913818 | 116.363625"]);
