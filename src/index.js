import program from 'commander';
import {
  genDiff, getExtName, getFilePath, getData, getParsedData, getDiff,
} from './gendiff.js';
import getDiffPlainType from './formatters/plain.js';

export default () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>');

  program.action((filepath1, filepath2) => {
    const extName1 = getExtName(filepath1);
    const extName2 = getExtName(filepath2);
    const path1 = getFilePath(filepath1);
    const path2 = getFilePath(filepath2);
    const data1 = getData(path1);
    const data2 = getData(path2);
    const parsedData1 = getParsedData(data1, extName1);
    const parsedData2 = getParsedData(data2, extName2);
    const processedData = genDiff(parsedData1, parsedData2);
    if (program.format === 'stylish') {
      console.log(getDiff(processedData, parsedData1, parsedData2));
    } else if (program.format === 'plain') {
      console.log(getDiffPlainType(processedData, parsedData1, parsedData2));
    } else if (program.format === 'json') {
      console.log(JSON.stringify(processedData, null, 2));
    }
  });
  program.parse(process.argv);
};
