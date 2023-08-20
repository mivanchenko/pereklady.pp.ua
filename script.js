(async function() {
  let mistakes = await getMistakes('https://pereklady.pp.ua/api/mistakes-test.json');
  myFunc(JSON.parse(mistakes));

  async function getMistakes(file) {
    let myObject = await fetch(file);
    let mistakes = await myObject.json();
    return mistakes;
  }
})();
