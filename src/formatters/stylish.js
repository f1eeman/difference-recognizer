import _ from 'lodash';

const getSubstr = (beginIndent, endIndent, value) => {
  if (_.isPlainObject(value)) {
    const [keyOfOldValue] = Object.keys(value);
    const innerValue = value[keyOfOldValue];
    return `{\n${beginIndent}${keyOfOldValue}: ${innerValue}\n${endIndent}}`;
  }
  return `${value}`;
};

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
      if (type === 'modified') {
        const substForOldValue = getSubstr(indentInner, indentBeforeCloseBracket, oldValue);
        const substrForNewValue = getSubstr(indentInner, indentBeforeCloseBracket, newValue);
        return `${acc}${firstSymbol}${indentOut}- ${key}: ${substForOldValue}\n${indentOut}+ ${key}: ${substrForNewValue}`;
      }
      if (type === 'added') {
        const substrForCurrentValue = getSubstr(
          indentInner, indentBeforeCloseBracket, currentValue
        );
        return `${acc}${firstSymbol}${indentOut}+ ${key}: ${substrForCurrentValue}`;
      }
      if (type === 'deleted') {
        const substrForDeletedValue = getSubstr(
          indentInner, indentBeforeCloseBracket, currentValue
        );
        return `${acc}${firstSymbol}${indentOut}- ${key}: ${substrForDeletedValue}`;
      }
      return `${acc}${firstSymbol}${indentForUnchangedValue}${key}: ${currentValue}`;
    }, '');
    return `${result}`;
  };
  return `{\n${getStr(data)}\n}`;
};
