function createDictionary(input) {
  const dictionary = [];

  input.forEach((termAndDefinition) => {
    const obj = JSON.parse(termAndDefinition);
    let hasProperty = false;

    for (const item of dictionary) {
      const objArr = Object.entries(obj)[0];

      if (item.hasOwnProperty(objArr[0])) {
        item[objArr[0]] = objArr[1];
        hasProperty = true;
        break;
      }
    }

    if (!hasProperty) {
      dictionary.push(obj);
    }
  });

  dictionary
    .map((termAndDefinition) => Object.entries(termAndDefinition)[0])
    .sort((a, b) => (a[0] > b[0]) - (a[0] < b[0]))
    .forEach((entry) => console.log(`Term: ${entry[0]} => Definition: ${entry[1]}`));
}

createDictionary([
  '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
  '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
  '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
  '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
  '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}',
]);
