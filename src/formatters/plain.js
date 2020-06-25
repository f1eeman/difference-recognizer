import _ from 'lodash';

export default (data) => {
  const getStr = (tree, parent = '') => {
    const result = tree.flatMap((node) => {
      const {
        key, type, value, oldValue, newValue, children,
      } = node;
      const propertyName = `${parent}${key}`;
      if (type === 'parent') {
        const newParent = `${parent}${key}.`;
        return getStr(children, newParent);
      }
      if (type === 'modified') {
        if (_.isPlainObject(oldValue)) {
          return `Property '${propertyName}' was changed from [complex value] to '${newValue}'`;
        }
        if (_.isPlainObject(newValue)) {
          return `Property '${propertyName}' was changed from '${oldValue}' to [complex value]`;
        }
        return `Property '${propertyName}' was changed from '${oldValue}' to '${newValue}'`;
      }

      if (type === 'added') {
        if (_.isPlainObject(value)) {
          return `Property '${propertyName}' was added with value: [complex value]`;
        }
        return `Property '${propertyName}' was added with value: ${value}`;
      }

      if (type === 'deleted') {
        return `Property '${propertyName}' was deleted`;
      }
      return '';
    });
    return result;
  };
  return getStr(data).filter((el) => el !== '').join('\n');
};
