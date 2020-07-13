import _ from 'lodash';

const getSubstr = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getDataInPlainType = (tree, parent = '') => {
  const result = tree.flatMap((node) => {
    const {
      key, type, value, value1, value2, children,
    } = node;
    const propertyName = `${parent}${key}`;
    const newParent = `${propertyName}.`;
    switch (type) {
      case 'parent':
        return getDataInPlainType(children, newParent);
      case 'modified':
        return `Property '${propertyName}' was updated. From ${getSubstr(value1)} to ${getSubstr(value2)}`;
      case 'added':
        return `Property '${propertyName}' was added with value: ${getSubstr(value)}`;
      case 'deleted':
        return `Property '${propertyName}' was removed`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return result;
};

export default (tree) => getDataInPlainType(tree).join('\n');
