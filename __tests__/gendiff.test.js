import genDiff from '../src/gendiff.js';

test('gendiff', () => {
  expect(genDiff('../__fixtures__/before.json', '../__fixtures__/after.json')).toBe(`{
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
