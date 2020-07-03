import _ from 'lodash';

export default (data) => {
  const getStr = (tree, spacesCount = 4, stepForSpacesCount = 2) => {
    const result = tree.reduce((acc, node) => {
      const firstSymbol = acc.length === 0 ? '' : '\n';
      const spacesBeforeValuesCount = spacesCount - stepForSpacesCount;
      const spacesBeforeInnerValuesCount = spacesCount + (stepForSpacesCount * 2);
      const indentOut = ' '.repeat(spacesBeforeValuesCount);
      const indentInner = ' '.repeat(spacesBeforeInnerValuesCount);
      const indentBeforeCloseBracket = ' '.repeat(spacesCount);
      const indentForUnchangedValue = ' '.repeat(spacesCount);
      const {
        key, type, currentValue, oldValue, newValue, children,
      } = node;
      if (type === 'parent') {
        const indent = ' '.repeat(spacesCount);
        return `${acc}${firstSymbol}${indent}${key}: {\n${getStr(children, spacesCount + (stepForSpacesCount * 2))}\n${indent}}`;
      }
      if (type === 'modified' && _.isPlainObject(oldValue)) {
        const [keyOfOldValue] = Object.keys(oldValue);
        const innerValue = oldValue[keyOfOldValue];
        return `${acc}${firstSymbol}${indentOut}- ${key}: {\n${indentInner}${keyOfOldValue}: ${innerValue}\n${indentBeforeCloseBracket}}\n${indentOut}+ ${key}: ${newValue}`;
      }
      if (type === 'modified' && _.isPlainObject(newValue)) {
        const [keyOfNewValue] = Object.keys(newValue);
        const innerValue = newValue[keyOfNewValue];
        return `${acc}${firstSymbol}${indentOut}- ${key}: ${oldValue}\n${indentOut}+ ${key}: {\n${indentInner}${keyOfNewValue}: ${innerValue}\n${indentBeforeCloseBracket}}`;
      }
      if (type === 'modified') {
        return `${acc}${firstSymbol}${indentOut}- ${key}: ${oldValue}\n${indentOut}+ ${key}: ${newValue}`;
      }
      if (type === 'added' && _.isPlainObject(currentValue)) {
        const [keyOfNewValue] = Object.keys(currentValue);
        const innerValue = currentValue[keyOfNewValue];
        return `${acc}${firstSymbol}${indentOut}+ ${key}: {\n${indentInner}${keyOfNewValue}: ${innerValue}\n${indentBeforeCloseBracket}}`;
      }
      if (type === 'added') {
        return `${acc}${firstSymbol}${indentOut}+ ${key}: ${currentValue}`;
      }
      if (type === 'deleted' && _.isPlainObject(currentValue)) {
        const [keyOfOldValue] = Object.keys(currentValue);
        const innerValue = currentValue[keyOfOldValue];
        return `${acc}${firstSymbol}${indentOut}- ${key}: {\n${indentInner}${keyOfOldValue}: ${innerValue}\n${indentBeforeCloseBracket}}`;
      }
      if (type === 'deleted') {
        return `${acc}${firstSymbol}${indentOut}- ${key}: ${currentValue}`;
      }
      return `${acc}${firstSymbol}${indentForUnchangedValue}${key}: ${currentValue}`;
    }, '');
    return `${result}`;
  };
  return `{\n${getStr(data)}\n}`;
};
