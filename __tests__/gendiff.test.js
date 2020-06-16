import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const getFilePath = (fileName) => path.join(`${process.cwd()}/__fixtures__/${fileName}`);
const pathToJsonFile1 = getFilePath('before.json');
const pathToJsonFile2 = getFilePath('after.json');
const pathToIniFile1 = getFilePath('before.ini');
const pathToIniFile2 = getFilePath('after.ini');
const pathToYamlFile1 = getFilePath('before.yaml');
const pathToYamlFile2 = getFilePath('after.yaml');
const pathToResultStylishFormatter = getFilePath('result-stylish-formatter.txt');
const pathToResultPlainFormatter = getFilePath('result-plain-formatter.txt');
const pathToResultJsonFormatter = getFilePath('result-json-formatter.json');
const pathToResultJsonFormatterIni = getFilePath('result-json-formatter-ini.json');
const resultStylishFormatter = fs.readFileSync(pathToResultStylishFormatter, 'utf8');
const resultPlainFormatter = fs.readFileSync(pathToResultPlainFormatter, 'utf8');
const resultJsonFormatter = fs.readFileSync(pathToResultJsonFormatter, 'utf8');
const resultJsonFormatterIni = fs.readFileSync(pathToResultJsonFormatterIni, 'utf8');
const table = [
  [pathToJsonFile1, pathToJsonFile2, resultStylishFormatter, 'stylish'],
  [pathToIniFile1, pathToIniFile2, resultStylishFormatter, 'stylish'],
  [pathToYamlFile1, pathToYamlFile2, resultStylishFormatter, 'stylish'],
  [pathToJsonFile1, pathToJsonFile2, resultPlainFormatter, 'plain'],
  [pathToIniFile1, pathToIniFile2, resultPlainFormatter, 'plain'],
  [pathToYamlFile1, pathToYamlFile2, resultPlainFormatter, 'plain'],
  [pathToJsonFile1, pathToJsonFile2, resultJsonFormatter, 'json'],
  [pathToIniFile1, pathToIniFile2, resultJsonFormatterIni, 'json'],
  [pathToYamlFile1, pathToYamlFile2, resultJsonFormatter, 'json'],
];

test.each(table)('gendiff %#', (pathToFile1, pathToFile2, expected, formatter) => {
  expect(genDiff(pathToFile1, pathToFile2, formatter)).toBe(expected);
});
