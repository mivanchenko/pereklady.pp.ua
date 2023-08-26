(function() { window.onload = async function () {
  let rules = await getRulesFrom(['/rules/my.json', '/rules/farion.json']);
  logg(rules);

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

  function logg(msg) {
    console.log(msg);
  }
}})();
