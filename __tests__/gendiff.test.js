import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

let getFilePath;
let expectedResults;
let formatters;

const testArguments = [
  ['before.json', 'after.json'],
  ['before.ini', 'after.ini'],
  ['before.yaml', 'after.yaml'],
];

beforeAll(() => {
  const fileNames = ['result-stylish-formatter.txt', 'result-plain-formatter.txt', 'result-json-formatter.json'];
  formatters = ['stylish', 'plain', 'json'];
  getFilePath = (fileName) => path.join(`${process.cwd()}/__fixtures__/${fileName}`);
  expectedResults = fileNames
    .map((fileName) => getFilePath(fileName))
    .map((filePath) => fs.readFileSync(filePath, 'utf8'));
});

test.each(testArguments)('gendiff %s %s %#', (fileName1, fileName2) => {
  const pathToFile1 = getFilePath(fileName1);
  const pathToFile2 = getFilePath(fileName2);
  const actualResults = formatters.map((formatter) => genDiff(pathToFile1, pathToFile2, formatter));
  expect(actualResults).toEqual(expectedResults);
});
