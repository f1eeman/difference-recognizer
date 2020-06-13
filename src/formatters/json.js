import { genDiff, getParsedData } from '../tools/utilities.js';

export default (fileName1, fileName2) => {
  const dataBefore = getParsedData(fileName1);
  const dataAfter = getParsedData(fileName2);
  const diff = genDiff(dataBefore, dataAfter);
  return JSON.stringify(diff, null, 2);
};
