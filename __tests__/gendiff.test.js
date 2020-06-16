import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

let pathToJsonFile1;
let pathToJsonFile2;
let pathToIniFile1;
let pathToIniFile2;
let pathToYamlFile1;
let pathToYamlFile2;
let pathToResultStylishFormatterNestedStructure;
let pathToResultPlainFormatterNestedStructure;
let pathToResultJsonFormatterNestedStructure;
let pathToResultStylishFormatterFlatStructure;
let pathToResultPlainFormatterFlatStructure;
let pathToResultJsonFormatterFlatStructureIni;
let pathToResultJsonFormatterFlatStructureYaml;
let resultStylishFormatterNestedStructure;
let resultPlainFormatterNestedStructure;
let resultJsonFormatterNestedStructure;
let resultStylishFormatterFlatStructure;
let resultPlainFormatterFlatStructure;
let resultJsonFormatterFlatStructureIni;
let resultJsonFormatterFlatStructureYaml;
beforeAll(() => {
  const getFilePath = (fileName) => path.join(`${process.cwd()}/__fixtures__/${fileName}`);
  pathToJsonFile1 = getFilePath('before.json');
  pathToJsonFile2 = getFilePath('after.json');
  pathToIniFile1 = getFilePath('before.ini');
  pathToIniFile2 = getFilePath('after.ini');
  pathToYamlFile1 = getFilePath('before.yaml');
  pathToYamlFile2 = getFilePath('after.yaml');
  pathToResultStylishFormatterNestedStructure = getFilePath('result-stylish-nested-structure.txt');
  pathToResultPlainFormatterNestedStructure = getFilePath('result-plain-nested-structure.txt');
  pathToResultJsonFormatterNestedStructure = getFilePath('result-json-nested-structure.json');
  pathToResultStylishFormatterFlatStructure = getFilePath('result-stylish-flat-structure.txt');
  pathToResultPlainFormatterFlatStructure = getFilePath('result-plain-flat-structure.txt');
  pathToResultJsonFormatterFlatStructureIni = getFilePath('result-json-flat-structure-ini.json');
  pathToResultJsonFormatterFlatStructureYaml = getFilePath('result-json-flat-structure-yaml.json');
  resultStylishFormatterNestedStructure = fs.readFileSync(pathToResultStylishFormatterNestedStructure, 'utf8');
  resultPlainFormatterNestedStructure = fs.readFileSync(pathToResultPlainFormatterNestedStructure, 'utf8');
  resultJsonFormatterNestedStructure = fs.readFileSync(pathToResultJsonFormatterNestedStructure, 'utf8');
  resultStylishFormatterFlatStructure = fs.readFileSync(pathToResultStylishFormatterFlatStructure, 'utf8');
  resultPlainFormatterFlatStructure = fs.readFileSync(pathToResultPlainFormatterFlatStructure, 'utf8');
  resultJsonFormatterFlatStructureIni = fs.readFileSync(pathToResultJsonFormatterFlatStructureIni, 'utf8');
  resultJsonFormatterFlatStructureYaml = fs.readFileSync(pathToResultJsonFormatterFlatStructureYaml, 'utf8');
});

test('genDiffStylishTypeNestedStructure(JSON)', () => {
  expect(genDiff(pathToJsonFile1, pathToJsonFile2)).toBe(resultStylishFormatterNestedStructure);
});

test('getDiffPlainTypeNestedStructure(JSON)', () => {
  expect(genDiff(pathToJsonFile1, pathToJsonFile2, 'plain')).toBe(resultPlainFormatterNestedStructure);
});

test('genDiffJsonTypeNestedStructure(JSON)', () => {
  expect(genDiff(pathToJsonFile1, pathToJsonFile2, 'json')).toBe(resultJsonFormatterNestedStructure);
});

test('genDiffStylishTypeFlatStructure(ini)', () => {
  expect(genDiff(pathToIniFile1, pathToIniFile2)).toBe(resultStylishFormatterFlatStructure);
});

test('getDiffPlainTypeFlatStructure(ini)', () => {
  expect(genDiff(pathToIniFile1, pathToIniFile2, 'plain')).toBe(resultPlainFormatterFlatStructure);
});

test('genDiffJsonTypeFlatStructure(ini)', () => {
  expect(genDiff(pathToIniFile1, pathToIniFile2, 'json')).toBe(resultJsonFormatterFlatStructureIni);
});

test('genDiffStylishTypeFlatStructure(yaml)', () => {
  expect(genDiff(pathToYamlFile1, pathToYamlFile2)).toBe(resultStylishFormatterFlatStructure);
});

test('getDiffPlainTypeFlatStructure(yaml)', () => {
  expect(genDiff(pathToYamlFile1, pathToYamlFile2, 'plain')).toBe(resultPlainFormatterFlatStructure);
});

test('genDiffJsonTypeFlatStructure(yaml)', () => {
  expect(genDiff(pathToYamlFile1, pathToYamlFile2, 'json')).toBe(resultJsonFormatterFlatStructureYaml);
});
