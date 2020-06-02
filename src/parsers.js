import yaml from 'js-yaml';

export default (data, extname) => {
  let result = '';
  if (extname === '.json') {
    result = JSON.parse(data);
  } else if (extname === '.yaml') {
    result = yaml.safeLoad(data);
  }
  return result;
};
