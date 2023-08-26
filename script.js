(async function() {
  let myObject = await fetch('https://pereklady.pp.ua/api/mistakes-test.json');
  let mistakes = await myObject.json();
  jsonp(JSON.stringify(mistakes));
})();

//let myTable = document.getElementsByTagName('table')[0];
//myTable.innerHTML = '<thead><th>Неправильно</th><th>Правильно</th></thead>' +
//  '<tbody><tr><td>asdf1</td><td>asdf2</td></tr></tbody>';
