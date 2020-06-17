import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const getFilePath = (fileName) => path.join(`${process.cwd()}/__fixtures__/${fileName}`);
const fileName1 = 'before';
const fileName2 = 'after';
const fileNames = ['result-stylish-formatter.txt', 'result-plain-formatter.txt', 'result-json-formatter.json'];
const formatters = ['stylish', 'plain', 'json'];
let expectedResults;

const testArguments = [
  ['json'],
  ['ini'],
  ['yaml'],
];

beforeAll(() => {
  expectedResults = fileNames
    .map((fileName) => getFilePath(fileName))
    .map((filePath) => fs.readFileSync(filePath, 'utf8'));
});

test.each(testArguments)('gendiff %s %s %#', (fileExtName) => {
  const pathToFile1 = getFilePath(`${fileName1}.${fileExtName}`);
  const pathToFile2 = getFilePath(`${fileName2}.${fileExtName}`);
  const actualResults = formatters.map((formatter) => genDiff(pathToFile1, pathToFile2, formatter));
  expect(actualResults).toEqual(expectedResults);
});
