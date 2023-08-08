(async function() {
  // ensure ?spellcheck=true
  let params = new URL(document.location).searchParams;
  if (params.get('spellcheck') !== 'true') {
    return;
  }

  let haystack = document.body.textContent;

  let mistakesFound = false;
  let mistakes = await getMistakes('/api/mistakes.json');
  for (let mistake of mistakes) {
    if (!mistake || !mistake.wrong || !mistake.right) {
      continue;
    }
    if (!mistake.wrong.copy || !mistake.right.length) {
      continue;
    }
    let needle = mistake.wrong.copy.replace(/\s+/g, '\\s+');
    let needleRegexp = new RegExp(needle, 'gi');
    let matches = haystack.match(needleRegexp);
    if (matches) {
      if (!mistakesFound) {
        logg('\u2718 Mistakes found:');
        mistakesFound = true;
      }
      logg(`(${matches.length}) [${mistake.wrong.copy}]: ${mistake.right.join(', ')}`);
    }
  }

  if (!mistakesFound) {
    logg('\u2714 No mistakes are found');
  } else {
    logg('done');
  }

  async function getMistakes(file) {
    let myObject = await fetch(file);
    let mistakes = await myObject.json();
    return mistakes;
  }

  function logg(msg) {
    console.log(msg);
  }
})();
