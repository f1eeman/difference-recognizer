import path, { dirname } from 'path';
import {
  genDiff, getDiff, getData, getParsedData, getExtName,
} from '../src/gendiff.js';


test('gendiff(flat JSON)', () => {
  const dirname1 = dirname('__fixtures__/before.json');
  const dirname2 = dirname('__fixtures__/after.json');
  const fileName1 = 'before.json';
  const fileName2 = 'after.json';
  const extName1 = getExtName(fileName1);
  const extName2 = getExtName(fileName2);
  const path1 = path.join(dirname1, fileName1);
  const path2 = path.join(dirname2, fileName2);
  const data1 = getData(path1);
  const data2 = getData(path2);
  const parsedData1 = getParsedData(data1, extName1);
  const parsedData2 = getParsedData(data2, extName2);
  const processedData = genDiff(parsedData1, parsedData2);

  expect(getDiff(processedData, parsedData1, parsedData2)).toMatch(`{
  - name: Falcon
  + name: Mary
  - gender: male
  + gender: female
    os: ios
  - height: 178
  + height: 198
  - color: white
  + korean: false
  + friends: false
}`);
});

test('gendiff(nested JSON)', () => {
  const dirname1 = dirname('__fixtures__/before.json');
  const dirname2 = dirname('__fixtures__/after.json');
  const fileName1 = 'before2.json';
  const fileName2 = 'after2.json';
  const extName1 = getExtName(fileName1);
  const extName2 = getExtName(fileName2);
  const path1 = path.join(dirname1, fileName1);
  const path2 = path.join(dirname2, fileName2);
  const data1 = getData(path1);
  const data2 = getData(path2);
  const parsedData1 = getParsedData(data1, extName1);
  const parsedData2 = getParsedData(data2, extName2);
  const processedData = genDiff(parsedData1, parsedData2);

  expect(getDiff(processedData, parsedData1, parsedData2)).toMatch(`{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }      
      + nest: str
    }
  - group2: {
      abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`);
});

test('gendiff(yaml)', () => {
  const dirname1 = dirname('__fixtures__/before.yaml');
  const dirname2 = dirname('__fixtures__/after.yaml');
  const fileName1 = 'before.yaml';
  const fileName2 = 'after.yaml';
  const extName1 = getExtName(fileName1);
  const extName2 = getExtName(fileName2);
  const path1 = path.join(dirname1, fileName1);
  const path2 = path.join(dirname2, fileName2);
  const data1 = getData(path1);
  const data2 = getData(path2);
  const parsedData1 = getParsedData(data1, extName1);
  const parsedData2 = getParsedData(data2, extName2);
  const processedData = genDiff(parsedData1, parsedData2);
  expect(getDiff(processedData, parsedData1, parsedData2)).toMatch(`{
    name: Mary
  - gender: male
  + gender: female
  - os: ios
  + os: android
  - height: 178
  + height: 198
  + korean: false
  + friends: false
}`);
});

test('gendiff(ini)', () => {
  const dirname1 = dirname('__fixtures__/before.ini');
  const dirname2 = dirname('__fixtures__/after.ini');
  const fileName1 = 'before.ini';
  const fileName2 = 'after.ini';
  const extName1 = getExtName(fileName1);
  const extName2 = getExtName(fileName2);
  const path1 = path.join(dirname1, fileName1);
  const path2 = path.join(dirname2, fileName2);
  const data1 = getData(path1);
  const data2 = getData(path2);
  const parsedData1 = getParsedData(data1, extName1);
  const parsedData2 = getParsedData(data2, extName2);
  const processedData = genDiff(parsedData1, parsedData2);
  expect(getDiff(processedData, parsedData1, parsedData2)).toMatch(`{
    name: Mary
  - gender: male
  + gender: female
  - os: ios
  + os: android
  - height: 178
  + height: 198
  + korean: false
  + friends: false
}`);
});
