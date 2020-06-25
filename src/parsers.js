import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const fixBugWithNumbers = (data) => {
  const keys = Object.keys(data);
  const result = keys.reduce((acc, key) => {
    const currentValue = data[key];
    const isNotNumber = _.isNaN(Number(currentValue)) || _.isBoolean(currentValue);
    const newValue = isNotNumber ? currentValue : Number(currentValue);
    if (_.isPlainObject(newValue)) {
      return { ...acc, [key]: fixBugWithNumbers(newValue) };
    }
    return { ...acc, [key]: newValue };
  }, {});
  return result;
};

const parse = (data, extname) => {
  switch (extname) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.safeLoad(data);
    case 'ini':
      return fixBugWithNumbers(ini.parse(data));
    default:
      throw new Error(`Unknown file extension: ${extname}`);
  }
};

export default (fileName) => {
  const extName = path.extname(fileName).slice(1);
  const filePath = path.resolve(process.cwd(), fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  const parsedData = parse(data, extName);
  return parsedData;
};
