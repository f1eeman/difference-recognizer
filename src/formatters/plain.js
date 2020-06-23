import _ from 'lodash';

export default (data) => {
  const getStr = (obj, parent = '') => {
    const keys = Object.keys(obj);
    const entries = Object.entries(obj);
    const result = entries.reduce((acc, [key, innerValue], currentIndex) => {
      if (Array.isArray(innerValue)) {
        const [objOfInnerValue] = innerValue;
        const newParent = `${parent}${key}.`;
        return [...acc, getStr(objOfInnerValue, newParent)];
      }
      if (innerValue.type === 'modified') {
        const [oldKey, newKey] = Object.keys(obj[keys[currentIndex]]);
        const oldValue = obj[keys[currentIndex]][oldKey];
        const newValue = obj[keys[currentIndex]][newKey];
        if (_.isPlainObject(oldValue)) {
          return [...acc, `Property '${parent}${keys[currentIndex]}' was changed from [complex value] to '${newValue}'`];
        }
        if (_.isPlainObject(newValue)) {
          return [...acc, `Property '${parent}${keys[currentIndex]}' was changed from '${oldValue}' to [complex value]`];
        }
        return [...acc, `Property '${parent}${keys[currentIndex]}' was changed from '${oldValue}' to '${newValue}'`];
      }
      if (innerValue.type === 'added') {
        const [keyOfNewValue] = Object.keys(obj[keys[currentIndex]]);
        const newValue = obj[keys[currentIndex]][keyOfNewValue];
        if (_.isPlainObject(newValue)) {
          return [...acc, `Property '${parent}${keys[currentIndex]}' was added with value: [complex value]`];
        }
        return [...acc, `Property '${parent}${keys[currentIndex]}' was added with value: ${newValue}`];
      }
      if (innerValue.type === 'deleted') {
        return [...acc, `Property '${parent}${keys[currentIndex]}' was deleted`];
      }
      return acc;
    }, []);
    return result;
  };
  return _.flattenDeep(getStr(data)).join('\n');
};
