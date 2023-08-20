(async function() {
  let myObject = await fetch('https://pereklady.pp.ua/api/mistakes-test.json');
  let mistakes = await myObject.json();
  console.log(mistakes);
  jsonp(mistakes);
})();
