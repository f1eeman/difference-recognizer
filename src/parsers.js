import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';
import isNumber from './isNumber.js';

const replaceDataTypeOfDigitsFromStringToNumber = (data) => {
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const currentValue = data[key];
    const newValue = isNumber(currentValue) ? parseFloat(currentValue) : currentValue;
    if (_.isPlainObject(newValue)) {
      return { ...acc, [key]: replaceDataTypeOfDigitsFromStringToNumber(newValue) };
    }
    return { ...acc, [key]: newValue };
  }, {});
  return result;
};

export default (data, extname) => {
  switch (extname) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.safeLoad(data);
    case 'ini':
      return replaceDataTypeOfDigitsFromStringToNumber(ini.parse(data));
    default:
      throw new Error(`Unknown file extension: ${extname}`);
  }
};
