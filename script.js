(async function() {
  let params = new URL(document.location).searchParams;
  if (params.get('get') !== 'mistakes') {
    return;
  }
  let myObject = await fetch('https://pereklady.pp.ua/api/mistakes-test.json');
  let mistakes = await myObject.json();
  jsonp(JSON.stringify(mistakes));
})();
