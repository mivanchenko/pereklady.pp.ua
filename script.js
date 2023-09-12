(async function() {
  try {
    const requestOptions = {
      method: 'GET',
      headers: new Headers(),
      redirect: 'follow',
    };
    const response = await fetch('https://pereklady.pp.ua/rules/test.json', requestOptions);
    if (!response.ok) {
      throw new Error('Cannot fetch rules');
    }
    const rules = await response.json();
    jsonp(JSON.stringify(rules));
  } catch (err) {
    console.error('Something went wrong when fetching rules');
    console.error(err);
  }
})();
