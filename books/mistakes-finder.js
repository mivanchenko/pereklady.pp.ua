(async function() {

  let haystack = document.body.innerText;
//  haystack = 'матеріял: вилита матеріялізмом.';
  haystack = haystack.replace(/(^|\s+|$)/g, ' ');

  let rules = await getRulesFrom(['/rules/test.json', '/rules/farion.json']);

  let firstFinding = true;
  for (let rule of rules) {
    if (!isRuleEligible(rule)) {
      continue;
    }
    let matches = findMistake(rule, haystack);
    if (!matches) {
      continue;
    }
    if (firstFinding) {
      firstFinding = false;
      logg('\u2718 Mistakes found:');
    }
    showStats(rule, matches);
  }

  if (firstFinding) {
    logg('\u2714 No mistakes found');
  }
  logg('done');

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

  function isRuleEligible(rule) {
    if (!rule || !rule.wrong || !rule.right) {
      return false;
    }
    return true;
  }

  function findMistake(rule, haystack) {
    let needle = prepareNeedle(rule);
    let needleRegexp = new RegExp(needle, 'gi');
    let matches = haystack.match(needleRegexp);
    if (!matches) {
      return false;
    }
    return matches;
  }

  function prepareNeedle(rule) {
    let needle = ` ${rule.wrong} `;
    needle = needle.replace(/ (в|у) /, ' (в|у) ');
    needle = needle.replace(/ (і|й) /, ' (і|й) ');
    needle = needle.replace('*', '\\S*');
    return needle;
  }

  function showStats(rule, matches) {
    let allMatches = {};
    for (let match of matches) {
      allMatches[match] ||= 0;
      allMatches[match] += 1;
    }
    let uniqueMatches = [...new Set(matches)];
    for (let uniqueMatch of uniqueMatches) {
      logg(`(${allMatches[uniqueMatch]}) [${uniqueMatch}]: ${rule.right}`);
    }
  }

  function logg(msg) {
    console.log(msg);
  }
})();
