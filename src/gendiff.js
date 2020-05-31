import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default (file1, file2) => {
  const dataBeforePath = path.resolve(process.cwd(), file1);
  const dataAfterPath = path.resolve(process.cwd(), file2);
  const dataBefore = JSON.parse(fs.readFileSync(dataBeforePath, 'utf8'));
  const dataAfter = JSON.parse(fs.readFileSync(dataAfterPath, 'utf8'));
  const keysDataBefore = Object.keys(dataBefore);
  const keysDataAfter = Object.keys(dataAfter);
  const allKeys = _.union([...keysDataBefore, ...keysDataAfter]);
  const fourSpaces = ''.padStart(4);
  const twoSpaces = ''.padStart(2);

  const diffs = allKeys.reduce((acc, key) => {
    const newValue = dataAfter[key];
    const oldValue = dataBefore[key];
    if (_.hasIn(dataBefore, key) && _.hasIn(dataAfter, key)) {
      if (oldValue === newValue) {
        return [...acc, `${key}: ${oldValue}`];
      }
      return [...acc, `+ ${key}: ${newValue}`, `- ${key}: ${oldValue}`];
    }
    if (_.hasIn(dataBefore, key)) {
      return [...acc, `- ${key}: ${oldValue}`];
    }
    return [...acc, `+ ${key}: ${newValue}`];
  }, []);

  const result = `{\n${fourSpaces}${diffs.join(`\n${twoSpaces}`)}\n}`;
  return result;
};
