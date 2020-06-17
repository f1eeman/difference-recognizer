import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const getFilePath = (fileName) => path.join(`${process.cwd()}/__fixtures__/${fileName}`);
const fileName1 = 'before';
const fileName2 = 'after';
const formatters = ['stylish', 'plain', 'json'];
let pathToResultStylishFormatter;
let pathToResultPlainFormatter;
let pathToResultJsonFormatter;
let resultStylishFormatter;
let resultPlainFormatter;
let resultJsonFormatter;

const testArguments = [
  ['json'],
  ['ini'],
  ['yaml'],
];

beforeAll(() => {
  pathToResultStylishFormatter = getFilePath('result-stylish-formatter.txt');
  pathToResultPlainFormatter = getFilePath('result-plain-formatter.txt');
  pathToResultJsonFormatter = getFilePath('result-json-formatter.json');
  resultStylishFormatter = fs.readFileSync(pathToResultStylishFormatter, 'utf8');
  resultPlainFormatter = fs.readFileSync(pathToResultPlainFormatter, 'utf8');
  resultJsonFormatter = fs.readFileSync(pathToResultJsonFormatter, 'utf8');
});

test.each(testArguments)('gendiff %s', (fileExtName) => {
  const pathToFile1 = getFilePath(`${fileName1}.${fileExtName}`);
  const pathToFile2 = getFilePath(`${fileName2}.${fileExtName}`);
  formatters.map((formatter) => {
    const actual = genDiff(pathToFile1, pathToFile2, formatter);
    let expected;
    switch (formatter) {
      case ('stylish'):
        expected = resultStylishFormatter;
        break;
      case ('plain'):
        expected = resultPlainFormatter;
        break;
      case ('json'):
        expected = resultJsonFormatter;
        break;
      default:
        throw new Error(`Unknown formatter: ${formatter}`);
    }
    return expect(actual).toEqual(expected);
  });
});
