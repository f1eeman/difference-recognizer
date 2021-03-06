import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './tree.js';
import getFormattedData from './formatters/index.js';

const getExtName = (fileName) => path.extname(fileName).slice(1);

const getData = (fileName) => {
  const extNameFile = getExtName(fileName);
  const filePath = path.resolve(process.cwd(), fileName);
  const data = fs.readFileSync(filePath, 'utf8');
  const result = parse(data, extNameFile);
  return result;
};

export default (fileName1, fileName2, formatter = 'stylish') => {
  const data1 = getData(fileName1);
  const data2 = getData(fileName2);
  const diffTree = buildDiffTree(data1, data2);
  return getFormattedData(diffTree, formatter);
};
