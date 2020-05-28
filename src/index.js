import program from 'commander';

export default () => {
  program.version('0.0.1');
  program.usage('[options] <filepath1> </filepath2>');
  program.description('Compares two configuration files and shows a difference.');
  program.option('-f, --format [type]', 'output format');
  program.parse(process.argv);
};
