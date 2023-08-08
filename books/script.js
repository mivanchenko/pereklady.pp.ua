(function() {
  // ensure ?spellcheck=true
  let params = new URL(document.location).searchParams;
  if (params.get('spellcheck') !== 'true') {
    return;
  }

  let haystack = document.body.textContent;
//  logg(haystack);

//  let mistakes = [
//    {
//      wrong: { copy: '...' },
//      right: ['...', ...]
//    },
//  ];

  let mistakes = [
    {
      wrong: { copy: 'в першу чергу' },
      right: ['передусім', 'передовсім', 'насамперед']
    },
  ];

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
      logg(`(${matches.length}) [${mistake.wrong.copy}]: ${mistake.right.join(', ')}`);
    }
  }
  function logg(msg) {
    console.log(msg);
  }
})();
