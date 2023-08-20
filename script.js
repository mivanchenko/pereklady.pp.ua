console.log('ok');
(async function() {
  let mistakes = await getMistakes('/api/mistakes-test.json');
  logg(mistakes);

  async function getMistakes(file) {
    let myObject = await fetch(file);
    let mistakes = await myObject.json();
    return mistakes;
  }

  function logg(msg) {
    console.log(msg);
  }
})();
