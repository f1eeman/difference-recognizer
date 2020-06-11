import getDiffJsonType from './json.js';
import getDiffPlainType from './plain.js';
import getDiffStylishType from './stylish.js';
import { genDiff, getParsedData } from '../tools/utilities.js';

export default (fileName1, fileName2, formatter = 'stylish') => {
  const data1 = getParsedData(fileName1);
  const data2 = getParsedData(fileName2);
  const diff = genDiff(data1, data2);
  switch (formatter) {
    case 'json':
      return getDiffJsonType(diff);
    case 'plain':
      return getDiffPlainType(diff, data1, data2);
    default:
      return getDiffStylishType(diff, data1, data2);
  }
};
