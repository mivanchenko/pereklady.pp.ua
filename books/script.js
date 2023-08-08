(async function() {
  // ensure ?spellcheck=true
  let params = new URL(document.location).searchParams;
  if (params.get('spellcheck') !== 'true') {
    return;
  }

  let haystack = document.body.textContent;
//  let haystack = 'У першу чергу я зайшов сюди, це у першу чергу, а в першу чергу ні, у першу чергу.';

  let firstFinding = true;
  let mistakes = await getMistakes('/api/mistakes.json');
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
    if (!mistake.wrong.copy || !mistake.right.length) {
      return false;
    }
    return true;
  }

  function findMistake(mistake, haystack) {
    let needleRegexp = prepareNeedle(mistake);
    let matches = haystack.match(needleRegexp);
    if (!matches) {
      return false;
    }
    return matches;
  }

  function prepareNeedle(mistake) {
      let needle = mistake.wrong.copy.replace(/\s+/g, '\\s+');
      let needleRegexp = new RegExp(needle, 'gi');
      return needleRegexp;
  }

  function showStats(mistake, matches) {
    let allMatches = {};
    for (let match of matches) {
      allMatches[match] ||= 0;
      allMatches[match] += 1;
    }
    let uniqueMatches = [...new Set(matches)];
    for (let uniqueMatch of uniqueMatches) {
      logg(`(${allMatches[uniqueMatch]}) [${uniqueMatch}]: ${mistake.right.join(', ')}`);
    }
  }

  function logg(msg) {
    console.log(msg);
  }
})();
