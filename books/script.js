(async function() {
  // ensure ?spellcheck=true
  let params = new URL(document.location).searchParams;
  if (params.get('spellcheck') !== 'true') {
    return;
  }

  let haystack = document.body.textContent;
//  let haystack = 'У першу чергу, це не в першу чергу, а в першу чергу ні, а у першу чергу';

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
    let needle = mistake.wrong;
    needle = needle.replace(/^в /, '(в|у) ');
    needle = needle.replace(/ в /, ' (в|у) ');
    needle = needle.replace(/^у /, '(в|у) ');
    needle = needle.replace(/ у /, ' (в|у) ');
    needle = needle.replace(/^і /, '(і|й) ');
    needle = needle.replace(/ і /, ' (і|й) ');
    needle = needle.replace(/^й /, '(і|й) ');
    needle = needle.replace(/ й /, ' (і|й) ');
    needle = needle.replace(/\s+/g, '\\s+');
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
