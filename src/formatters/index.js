import getDiffJsonType from './json.js';
import getDiffPlainType from './plain.js';
import getDiffStylishType from './stylish.js';

export default (data, formatter) => {
  switch (formatter) {
    case 'json':
      return getDiffJsonType(data);
    case 'plain':
      return getDiffPlainType(data);
    case 'stylish':
      return getDiffStylishType(data);
    default:
      throw new Error(`Unknown formatter: ${formatter}`);
  }
};
