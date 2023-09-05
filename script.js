(async function() {
  let myObject = await fetch('https://pereklady.pp.ua/rules/test.json');
  let mistakes = await myObject.json();
  jsonp(JSON.stringify(mistakes));
})();
