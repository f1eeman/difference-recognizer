import path, { dirname } from 'path';
import genDiff from '../src/gendiff.js';

test('gendiff(JSON)', () => {
  const dirname1 = dirname('__fixtures__/before.json');
  const dirname2 = dirname('__fixtures__/after.json');
  const fileName1 = 'before.json';
  const fileName2 = 'after.json';
  const path1 = path.join(dirname1, fileName1);
  const path2 = path.join(dirname2, fileName2);

  expect(genDiff(path1, path2)).toMatch(`{
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

test('gendiff(YAML)', () => {
  const dirname1 = dirname('__fixtures__/before.yaml');
  const dirname2 = dirname('__fixtures__/after.yaml');
  const fileName1 = 'before.yaml';
  const fileName2 = 'after.yaml';
  const path1 = path.join(dirname1, fileName1);
  const path2 = path.join(dirname2, fileName2);

  expect(genDiff(path1, path2)).toMatch(`{
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
