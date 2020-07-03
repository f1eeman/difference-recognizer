import _ from 'lodash';

const getSubstr = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value)) {
    return `${value}`;
  }
  return `'${value}'`;
};

export default (data) => {
  const getStr = (tree, parent = '') => {
    const result = tree.flatMap((node) => {
      const {
        key, type, currentValue, oldValue, newValue, children,
      } = node;
      const propertyName = `${parent}${key}`;
      if (type === 'parent') {
        const newParent = `${propertyName}.`;
        return getStr(children, newParent);
      }
      if (type === 'modified') {
        const substrForOldValue = getSubstr(oldValue);
        const substrForNewValue = getSubstr(newValue);
        return `Property '${propertyName}' was updated. From ${substrForOldValue} to ${substrForNewValue}`;
      }
      if (type === 'added') {
        const substrForCurrentValue = getSubstr(currentValue);
        return `Property '${propertyName}' was added with value: ${substrForCurrentValue}`;
      }
      if (type === 'deleted') {
        return `Property '${propertyName}' was removed`;
      }
      return '';
    });
    return result;
  };
  return getStr(data).filter((el) => el !== '').join('\n');
};
