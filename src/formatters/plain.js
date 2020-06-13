import _ from 'lodash';
import { genDiff, getParsedData } from '../tools/utilities.js';

export default (fileName1, fileName2) => {
  const dataBefore = getParsedData(fileName1);
  const dataAfter = getParsedData(fileName2);
  const diff = genDiff(dataBefore, dataAfter);
  const getStr = (obj, data1, data2, parent = '') => {
    const keys = Object.keys(obj);
    const entries = Object.entries(obj);

    const result = entries.reduce((acc, [key, innerValue], currentIndex) => {
      if (Array.isArray(innerValue)) {
        const [objOfInnerValue] = innerValue;
        const newParent = `${parent}${key}.`;
        return [...acc, getStr(objOfInnerValue, data1[key], data2[key], newParent)];
      }

      if (innerValue.type === 'modified') {
        if (_.isPlainObject(data1[keys[currentIndex]])) {
          return [...acc, `Property '${parent}${keys[currentIndex]}' was changed from [complex value] to '${data2[keys[currentIndex]]}'`];
        }
        if (_.isPlainObject(data2[keys[currentIndex]])) {
          return [...acc, `Property '${parent}${keys[currentIndex]}' was changed from '${data1[keys[currentIndex]]}' to [complex value]`];
        }
        return [...acc, `Property '${parent}${keys[currentIndex]}' was changed from '${data1[keys[currentIndex]]}' to '${data2[keys[currentIndex]]}'`];
      }

      if (innerValue.type === 'added') {
        if (_.isPlainObject(data2[keys[currentIndex]])) {
          return [...acc, `Property '${parent}${keys[currentIndex]}' was added with value: [complex value]`];
        }
        return [...acc, `Property '${parent}${keys[currentIndex]}' was added with value: ${data2[keys[currentIndex]]}`];
      }

      if (innerValue.type === 'deleted') {
        return [...acc, `Property '${parent}${keys[currentIndex]}' was deleted`];
      }
      return acc;
    }, []);

    return result;
  };
  return _.flattenDeep(getStr(diff, dataBefore, dataAfter)).join('\n');
};
