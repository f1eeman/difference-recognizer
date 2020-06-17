import path from 'path';
import { genDiff, getParsedData, getDataWithProperTypeOfValues } from '../tools/utilities.js';

export default (fileName1, fileName2) => {
  const extName = path.extname(fileName1).slice(1);
  const dataBefore = getParsedData(fileName1);
  const dataAfter = getParsedData(fileName2);
  const newDataBefore = extName === 'ini' ? getDataWithProperTypeOfValues(dataBefore) : dataBefore;
  const newDataAfter = extName === 'ini' ? getDataWithProperTypeOfValues(dataAfter) : dataAfter;
  const diff = genDiff(newDataBefore, newDataAfter);
  return JSON.stringify(diff, null, 2);
};
