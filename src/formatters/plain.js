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

const getStrInPlainType = (tree, parent = '') => {
  const result = tree.flatMap((node) => {
    const {
      key, type, currentValue, oldValue, newValue, children,
    } = node;
    const propertyName = `${parent}${key}`;
    const newParent = `${propertyName}.`;
    const substrForOldValue = getSubstr(oldValue);
    const substrForNewValue = getSubstr(newValue);
    const substrForCurrentValue = getSubstr(currentValue);
    switch (type) {
      case 'parent':
        return getStrInPlainType(children, newParent);
      case 'modified':
        return `Property '${propertyName}' was updated. From ${substrForOldValue} to ${substrForNewValue}`;
      case 'added':
        return `Property '${propertyName}' was added with value: ${substrForCurrentValue}`;
      case 'deleted':
        return `Property '${propertyName}' was removed`;
      case 'unchanged':
        return '';
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return result;
};

export default (data) => getStrInPlainType(data).filter((el) => el !== '').join('\n');
