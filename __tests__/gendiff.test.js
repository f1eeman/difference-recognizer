import { dirname } from 'path';
import genDiff from '../src/gendiff.js';

let dirname1;
let dirname2;
let fileName1;
let fileName2;

beforeEach(() => {
  dirname1 = dirname('__fixtures__/before.json');
  dirname2 = dirname('__fixtures__/after.json');
  fileName1 = 'before.json';
  fileName2 = 'after.json';
});

test('gendiff', () => {
  expect(genDiff(`${dirname1}/${fileName1}`, `${dirname2}/${fileName2}`)).toMatch(`{
    name: Mary
  + gender: female
  - gender: male
  + os: android
  - os: ios
  + height: 198
  - height: 178
  + korean: false
  + friends: false
}`);
});
