let mistakes = await getMistakes('/api/mistakes-test.json');
console.log(mistakes);
async function getMistakes(file) {
  let myObject = await fetch(file);
  let mistakes = await myObject.json();
  return mistakes;
}
