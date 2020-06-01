import genDiff from '../src/gendiff.js';

test('gendiff', () => {
  expect(genDiff('../frontend-project-lvl2/__fixtures__/before.json', '../frontend-project-lvl2/__fixtures__/after.json')).toMatch(`{
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
