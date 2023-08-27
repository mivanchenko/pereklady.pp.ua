(function() { window.onload = async function () {
  let rules = await getRulesFrom(['/rules/my.json', '/rules/farion.json']);

  let myTable = document.getElementsByTagName('table')[0];
  myTable.innerHTML = buildTable(rules);

  async function getRulesFrom(files) {
    let promises = files.map(file => new Promise( async (resolve) => {
      let myObject = await fetch(file);
      let rules = await myObject.json();
      resolve(rules);
    }));
    let rules = await Promise.allSettled(promises);
    rules = rules.map(rule => rule.value);
    rules = rules.flat();
    return rules;
  }

  function buildTable(rules) {
    let trs = '';
    rules.forEach(rule => {
      trs += `<tr><td>${rule.wrong}</td><td>${rule.right}</td></tr>`;
    });
    let html = '<thead><th>Неправильно</th><th>Правильно</th></thead><tbody>' + trs + '</tbody>';
    return html;
  }

  function logg(msg) {
    console.log(msg);
  }
}})();
