import _ from 'lodash';

export default (data) => {
  const getStr = (tree, spacesCount = 4, stepForSpace = 2) => {
    const result = tree.reduce((acc, node) => {
      const firstSymbol = acc.length === 0 ? '' : '\n';
      const spacesBeforeValuesCount = spacesCount - stepForSpace;
      const spacesBeforeInnerValuesCount = spacesCount + stepForSpace + stepForSpace;
      const indentOut = ' '.repeat(spacesBeforeValuesCount);
      const indentInner = ' '.repeat(spacesBeforeInnerValuesCount);
      const indentBeforeCloseBracket = ' '.repeat(spacesCount);
      const indentForUnchangedValue = ' '.repeat(spacesCount);
      const {
        key, type, value, oldValue, newValue, children,
      } = node;
      if (type === 'parent') {
        const indent = ' '.repeat(spacesCount);
        return `${acc}${firstSymbol}${indent}${key}: {\n${getStr(children, spacesCount + stepForSpace + stepForSpace)}\n${indent}}`;
      }
      if (type === 'modified') {
        if (_.isPlainObject(oldValue)) {
          const [keyOfOldValue] = Object.keys(oldValue);
          const innerValue = oldValue[keyOfOldValue];
          return `${acc}${firstSymbol}${indentOut}- ${key}: {\n${indentInner}${keyOfOldValue}: ${innerValue}\n${indentBeforeCloseBracket}}${indentOut}\n${indentOut}+ ${key}: ${newValue}`;
        }
        if (_.isPlainObject(newValue)) {
          const [keyOfNewValue] = Object.keys(newValue);
          const innerValue = newValue[keyOfNewValue];
          return `${acc}${firstSymbol}${indentOut}- ${key}: ${oldValue}\n${indentOut}+ ${key}: {\n${indentInner}${keyOfNewValue}: ${innerValue}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}- ${key}: ${oldValue}\n${indentOut}+ ${key}: ${newValue}`;
      }
      if (type === 'added') {
        if (_.isPlainObject(value)) {
          const [keyOfNewValue] = Object.keys(value);
          const innerValue = value[keyOfNewValue];
          return `${acc}${firstSymbol}${indentOut}+ ${key}: {\n${indentInner}${keyOfNewValue}: ${innerValue}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}+ ${key}: ${value}`;
      }
      if (type === 'deleted') {
        if (_.isPlainObject(value)) {
          const [keyOfOldValue] = Object.keys(value);
          const innerValue = value[keyOfOldValue];
          return `${acc}${firstSymbol}${indentOut}- ${key}: {\n${indentInner}${keyOfOldValue}: ${innerValue}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}- ${key}: ${value}`;
      }
      return `${acc}${firstSymbol}${indentForUnchangedValue}${key}: ${value}`;
    }, '');
    return `${result}`;
  };
  return `{\n${getStr(data)}\n}`;
};
