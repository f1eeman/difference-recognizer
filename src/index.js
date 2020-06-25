import getParsedData from './parsers.js';
import genDiff from './gendiff.js';
import getFormattedData from './formatters/index.js';

export default (fileName1, fileName2, formatter) => {
  const dataBefore = getParsedData(fileName1);
  const dataAfter = getParsedData(fileName2);
  const diff = genDiff(dataBefore, dataAfter);
  return getFormattedData(diff, formatter);
};
