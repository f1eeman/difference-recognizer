import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

export const getParsedData = (fileName) => {
  const extName = path.extname(fileName).slice(1);
  const filePath = path.resolve(process.cwd(), fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  const parsedData = parse(data, extName);
  return parsedData;
};

export const getDataWithProperTypeOfValues = (data) => {
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const newValue = _.isNaN(+data[key]) || _.isBoolean(data[key]) ? data[key] : +data[key];
    if (_.isPlainObject(newValue)) {
      return { ...acc, [key]: getDataWithProperTypeOfValues(newValue) };
    }
    return { ...acc, [key]: newValue };
  }, {});
  return result;
};

export const genDiff = (dataBefore, dataAfter) => {
  const keysDataBefore = Object.keys(dataBefore);
  const keysDataAfter = Object.keys(dataAfter);
  const allKeys = _.union([...keysDataBefore, ...keysDataAfter]);

  const diffs = allKeys.reduce((acc, key) => {
    const newValue = dataAfter[key];
    const oldValue = dataBefore[key];
    if (_.isPlainObject(newValue) && _.isPlainObject(oldValue)) {
      return { ...acc, [key]: [genDiff(oldValue, newValue)] };
    }
    if (_.hasIn(dataBefore, key) && _.hasIn(dataAfter, key)) {
      if (oldValue === newValue) {
        return { ...acc, [key]: { value: oldValue, type: 'unchanged' } };
      }
      return { ...acc, [key]: { value: oldValue, type: 'modified' } };
    }
    if (_.hasIn(dataBefore, key)) {
      return { ...acc, [key]: { value: oldValue, type: 'deleted' } };
    }
    return { ...acc, [key]: { value: newValue, type: 'added' } };
  }, {});
  return diffs;
};
