import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

let pathToJsonFile1;
let pathToJsonFile2;
let pathToIniFile1;
let pathToIniFile2;
let pathToYamlFile1;
let pathToYamlFile2;
let pathToResultStylishFormatter;
let pathToResultPlainFormatter;
let pathToResultJsonFormatter;
let pathToResultJsonFormatterIni;
let resultStylishFormatter;
let resultPlainFormatter;
let resultJsonFormatter;
let resultJsonFormatterIni;

beforeAll(() => {
  const getFilePath = (fileName) => path.join(`${process.cwd()}/__fixtures__/${fileName}`);
  pathToJsonFile1 = getFilePath('before.json');
  pathToJsonFile2 = getFilePath('after.json');
  pathToIniFile1 = getFilePath('before.ini');
  pathToIniFile2 = getFilePath('after.ini');
  pathToYamlFile1 = getFilePath('before.yaml');
  pathToYamlFile2 = getFilePath('after.yaml');
  pathToResultStylishFormatter = getFilePath('result-stylish-formatter.txt');
  pathToResultPlainFormatter = getFilePath('result-plain-formatter.txt');
  pathToResultJsonFormatter = getFilePath('result-json-formatter.json');
  pathToResultJsonFormatterIni = getFilePath('result-json-formatter-ini.json');
  resultStylishFormatter = fs.readFileSync(pathToResultStylishFormatter, 'utf8');
  resultPlainFormatter = fs.readFileSync(pathToResultPlainFormatter, 'utf8');
  resultJsonFormatter = fs.readFileSync(pathToResultJsonFormatter, 'utf8');
  resultJsonFormatterIni = fs.readFileSync(pathToResultJsonFormatterIni, 'utf8');
});

test('genDiffStylishType(JSON)', () => {
  expect(genDiff(pathToJsonFile1, pathToJsonFile2)).toBe(resultStylishFormatter);
});

test('getDiffPlainType(JSON)', () => {
  expect(genDiff(pathToJsonFile1, pathToJsonFile2, 'plain')).toBe(resultPlainFormatter);
});

test('genDiffJsonType(JSON)', () => {
  expect(genDiff(pathToJsonFile1, pathToJsonFile2, 'json')).toBe(resultJsonFormatter);
});

test('genDiffStylishType(ini)', () => {
  expect(genDiff(pathToIniFile1, pathToIniFile2)).toBe(resultStylishFormatter);
});

test('getDiffPlainType(ini)', () => {
  expect(genDiff(pathToIniFile1, pathToIniFile2, 'plain')).toBe(resultPlainFormatter);
});

test('genDiffJsonType(ini)', () => {
  expect(genDiff(pathToIniFile1, pathToIniFile2, 'json')).toBe(resultJsonFormatterIni);
});

test('genDiffStylishType(yaml)', () => {
  expect(genDiff(pathToYamlFile1, pathToYamlFile2)).toBe(resultStylishFormatter);
});

test('getDiffPlainType(yaml)', () => {
  expect(genDiff(pathToYamlFile1, pathToYamlFile2, 'plain')).toBe(resultPlainFormatter);
});

test('genDiffJsonType(yaml)', () => {
  expect(genDiff(pathToYamlFile1, pathToYamlFile2, 'json')).toBe(resultJsonFormatter);
});
