(async function() {
  try {
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'temp123');
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
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
