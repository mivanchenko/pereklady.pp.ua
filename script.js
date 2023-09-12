(async function() {
  try {
    let response = await fetch('https://pereklady.pp.ua/rules/test.json');
    if (!response.ok) {
      throw new Error('Cannot fetch rules');
    }
    let rules = await response.json();
    jsonp(JSON.stringify(rules));
  } catch (err) {
    console.error('Something went wrong when fetching rules');
    console.error(err);
  }
})();
