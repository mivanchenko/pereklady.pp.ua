(async function() {
  // ensure ?check is in URL
//  let params = new URL(document.location).searchParams;
//  if (params.get('check') === null) {
//    return;
//  }

  let haystack = document.body.textContent;
//  haystack = 'матеріял: вилита матеріялізмом.';
  haystack = haystack.replace(/(^|\s+|$)/g, ' ');

//  let mistakes = await getMistakes('/api/mistakes-farion.json');
  let mistakes = await getMistakes('/api/mistakes-test.json');

  let firstFinding = true;
  for (let mistake of mistakes) {
    if (!isMistakeEligible(mistake)) {
      continue;
    }
    let matches = findMistake(mistake, haystack);
    if (!matches) {
      continue;
    }
    if (firstFinding) {
      firstFinding = false;
      logg('\u2718 Mistakes found:');
    }
    showStats(mistake, matches);
  }

  if (firstFinding) {
    logg('\u2714 No mistakes found');
  }
  logg('done');

  async function getMistakes(file) {
    let myObject = await fetch(file);
    let mistakes = await myObject.json();
    return mistakes;
  }

  function isMistakeEligible(mistake) {
    if (!mistake || !mistake.wrong || !mistake.right) {
      return false;
    }
    return true;
  }

  function findMistake(mistake, haystack) {
    let needle = prepareNeedle(mistake);
    let needleRegexp = new RegExp(needle, 'gi');
    let matches = haystack.match(needleRegexp);
    if (!matches) {
      return false;
    }
    return matches;
  }

  function prepareNeedle(mistake) {
    let needle = ` ${mistake.wrong} `;
    needle = needle.replace(/ (в|у) /, ' (в|у) ');
    needle = needle.replace(/ (і|й) /, ' (і|й) ');
    needle = needle.replace('*', '\\S*');
    return needle;
  }

  function showStats(mistake, matches) {
    let allMatches = {};
    for (let match of matches) {
      allMatches[match] ||= 0;
      allMatches[match] += 1;
    }
    let uniqueMatches = [...new Set(matches)];
    for (let uniqueMatch of uniqueMatches) {
      logg(`(${allMatches[uniqueMatch]}) [${uniqueMatch}]: ${mistake.right}`);
    }
  }

  function logg(msg) {
    console.log(msg);
  }
})();
