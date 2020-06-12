import path from 'path';
import genDiff from '../src/index.js';
import {
  resultForJsonFormatter, resultForPlainFormatter, resultForStylishFormatter,
} from '../__fixtures__/results.js';

let pathToFile1;
let pathToFile2;
beforeAll(() => {
  const getFilePath = (fileName) => path.join(`${process.cwd()}/__fixtures__/${fileName}`);
  pathToFile1 = getFilePath('before2.json');
  pathToFile2 = getFilePath('after2.json');
});

test('gendiff(nested JSON)', () => {
  expect(genDiff(pathToFile1, pathToFile2)).toBe(resultForStylishFormatter);
});


test('getDiffPlainType(nested JSON)', () => {
  expect(genDiff(pathToFile1, pathToFile2, 'plain')).toBe(resultForPlainFormatter);
});

test('genDiffJsonType(nested JSON)', () => {
  expect(genDiff(pathToFile1, pathToFile2, 'json')).toBe(resultForJsonFormatter);
});
