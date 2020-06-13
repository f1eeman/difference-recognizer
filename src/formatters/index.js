import getDiffJsonType from './json.js';
import getDiffPlainType from './plain.js';
import getDiffStylishType from './stylish.js';

export default (fileName1, fileName2, formatter = 'stylish') => {
  switch (formatter) {
    case 'json':
      return getDiffJsonType(fileName1, fileName2);
    case 'plain':
      return getDiffPlainType(fileName1, fileName2);
    case 'stylish':
      return getDiffStylishType(fileName1, fileName2);
    default:
      throw new Error(`Unknown formatter: ${formatter}`);
  }
};
