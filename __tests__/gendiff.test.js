import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (fileName) => path.join(`${__dirname}/../__fixtures__/${fileName}`);
const fileName1 = 'before';
const fileName2 = 'after';
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
  expect(genDiff(pathToFile1, pathToFile2, 'stylish')).toEqual(resultStylishFormatter);
  expect(genDiff(pathToFile1, pathToFile2, 'plain')).toEqual(resultPlainFormatter);
  expect(genDiff(pathToFile1, pathToFile2, 'json')).toEqual(resultJsonFormatter);
});
