function registerHeroes(heroes) {
  const heroesInfo = [];

  heroes.forEach((hero) => {
    const heroInfo = hero.split(" / ");
    heroesInfo.push({ heroName: heroInfo[0], level: heroInfo[1], items: heroInfo[2].split(", ") });
  });

  heroesInfo
    .sort((a, b) => a.level - b.level)
    .forEach((hero) => {
      console.log(`Hero: ${hero.heroName}`);
      console.log(`level => ${hero.level}`);
      console.log(`items => ${hero.items.join(", ")}`);
    });
}

registerHeroes([
  "Isacc / 25 / Apple, GravityGun",
  "Derek / 12 / BarrelVest, DestructionSword",
  "Hes / 1 / Desolator, Sentinel, Antara",
]);

registerHeroes([
  "Batman / 2 / Banana, Gun",
  "Superman / 18 / Sword",
  "Poppy / 28 / Sentinel, Antara",
]);
