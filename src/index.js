import program from 'commander';
import genDiff from './gendiff.js';

export default () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2));
    });

  program.parse(process.argv);
};
