import fs from 'fs';
import path from 'path';
import getParsedData from './parsers.js';
import genDiff from './gendiff.js';
import getFormattedData from './formatters/index.js';

const getData = (fileName) => {
  const filePath = path.resolve(process.cwd(), fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  return data;
};

const getExtName = (fileName) => path.extname(fileName).slice(1);

export default (fileName1, fileName2, formatter) => {
  const extNameFileBefore = getExtName(fileName1);
  const extNameFileAfter = getExtName(fileName2);
  const dataBefore = getData(fileName1);
  const dataAfter = getData(fileName2);
  const parsedDataBefore = getParsedData(dataBefore, extNameFileBefore);
  const parsedDataAfter = getParsedData(dataAfter, extNameFileAfter);
  const diff = genDiff(parsedDataBefore, parsedDataAfter);
  return getFormattedData(diff, formatter);
};
