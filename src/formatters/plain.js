import _ from 'lodash';
import isNumber from '../isNumber.js';

const getSubstr = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value) || isNumber(value)) {
    return value;
  }
  return `'${value}'`;
};

const getDataInPlainType = (tree, parent = '') => {
  const result = tree.flatMap((node) => {
    const {
      key, type, oldValue, newValue, children,
    } = node;
    const propertyName = `${parent}${key}`;
    const newParent = `${propertyName}.`;
    switch (type) {
      case 'parent':
        return getDataInPlainType(children, newParent);
      case 'modified':
        return `Property '${propertyName}' was updated. From ${getSubstr(oldValue)} to ${getSubstr(newValue)}`;
      case 'added':
        return `Property '${propertyName}' was added with value: ${getSubstr(newValue)}`;
      case 'deleted':
        return `Property '${propertyName}' was removed`;
      case 'unchanged':
        return '';
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return _.compact(result);
};

export default (data) => getDataInPlainType(data).join('\n');
