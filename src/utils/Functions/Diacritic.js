const diacritic = require('diacritic');

function removeDiacriticalMarks (str) {
  return diacritic.clean(str);
};

function replaceSpacesWithDash (str) {
  return str.replace(/\s+/g, '-');
};
function convertValueWithDashes (value){
  const strWithoutDiacriticalMarks = removeDiacriticalMarks(value)
  const strWithDashes = replaceSpacesWithDash(
    strWithoutDiacriticalMarks
  )
  return strWithDashes
}


export default { removeDiacriticalMarks,replaceSpacesWithDash, convertValueWithDashes };

