import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extname) => {
  switch (extname) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.safeLoad(data);
    case 'ini':
      return ini.parse(data);
    default:
      throw new Error(`Unknown file extension: ${extname}`);
  }
};
