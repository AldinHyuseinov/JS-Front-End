function createList(input) {
  // Remove last element, which is Stop
  input.pop();

  const pianoPieces = input.splice(0, Number(input.shift())).reduce((acc, curr) => {
    const [piece, composer, key] = curr.split("|");
    acc[piece] = {
      composer,
      key,
    };
    return acc;
  }, {});

  const commandParser = {
    Add: addPiece,
    Remove: removePiece,
    ChangeKey: changeKey,
  };

  input.forEach((commandString) => {
    const [command, ...info] = commandString.split("|");
    commandParser[command](info);
  });

  Object.entries(pianoPieces).forEach(([piece, { composer, key }]) =>
    console.log(`${piece} -> Composer: ${composer}, Key: ${key}`)
  );

  function addPiece([piece, composer, key]) {
    if (pianoPieces.hasOwnProperty(piece)) {
      console.log(`${piece} is already in the collection!`);
      return;
    }

    pianoPieces[piece] = {
      composer,
      key,
    };
    console.log(`${piece} by ${composer} in ${key} added to the collection!`);
  }

  function removePiece([piece]) {
    if (pieceExists(piece)) {
      delete pianoPieces[piece];
      console.log(`Successfully removed ${piece}!`);
    }
  }

  function changeKey([piece, newKey]) {
    if (pieceExists(piece)) {
      pianoPieces[piece].key = newKey;
      console.log(`Changed the key of ${piece} to ${newKey}!`);
    }
  }

  function pieceExists(piece) {
    if (pianoPieces.hasOwnProperty(piece)) {
      return true;
    }

    console.log(`Invalid operation! ${piece} does not exist in the collection.`);
    return false;
  }
}

createList([
  "3",
  "Fur Elise|Beethoven|A Minor",
  "Moonlight Sonata|Beethoven|C# Minor",
  "Clair de Lune|Debussy|C# Minor",
  "Add|Sonata No.2|Chopin|B Minor",
  "Add|Hungarian Rhapsody No.2|Liszt|C# Minor",
  "Add|Fur Elise|Beethoven|C# Minor",
  "Remove|Clair de Lune",
  "ChangeKey|Moonlight Sonata|C# Major",
  "Stop",
]);

createList([
  "4",
  "Eine kleine Nachtmusik|Mozart|G Major",
  "La Campanella|Liszt|G# Minor",
  "The Marriage of Figaro|Mozart|G Major",
  "Hungarian Dance No.5|Brahms|G Minor",
  "Add|Spring|Vivaldi|E Major",
  "Remove|The Marriage of Figaro",
  "Remove|Turkish March",
  "ChangeKey|Spring|C Major",
  "Add|Nocturne|Chopin|C# Minor",
  "Stop",
]);
