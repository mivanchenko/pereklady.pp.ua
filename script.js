(async function() {
  try {
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'temp123');
    const requestOptions = {
      method: 'GET',
      // Don't supply headers to make CORS work
      // headers: myHeaders,
      redirect: 'follow',
    };
    const responseObj = await fetch('https://pereklady.pp.ua/rules/test.json', requestOptions);
    if (!responseObj.ok) {
      throw new Error('Cannot fetch rules');
    }
    const rules = await responseObj.json();
    jsonp(JSON.stringify(rules));
  } catch (err) {
    console.error('Something went wrong when fetching rules');
    console.error(err);
  }
})();
