import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extname) => {
  if (extname === 'json') {
    return JSON.parse(data);
  }
  if (extname === 'yaml') {
    return yaml.safeLoad(data);
  }
  return ini.parse(data);
};
