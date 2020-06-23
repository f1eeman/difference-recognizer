import _ from 'lodash';

export default (data) => {
  const getStr = (obj, spacesCount = 4, stepForSpace = 2) => {
    const keys = Object.keys(obj);
    const entries = Object.entries(obj);
    const result = entries.reduce((acc, [key, innerValue], currentIndex) => {
      const firstSymbol = acc.length === 0 ? '' : '\n';
      const spacesBeforeValuesCount = spacesCount - stepForSpace;
      const spacesBeforeInnerValuesCount = spacesCount + stepForSpace + stepForSpace;
      const indentOut = ' '.repeat(spacesBeforeValuesCount);
      const indentInner = ' '.repeat(spacesBeforeInnerValuesCount);
      const indentBeforeCloseBracket = ' '.repeat(spacesCount);
      const indentForUnchangedValue = ' '.repeat(spacesCount);
      const [oldKey, newKey] = Object.keys(obj[keys[currentIndex]]);
      const oldValue = obj[keys[currentIndex]][oldKey];
      const newValue = obj[keys[currentIndex]][newKey];
      if (Array.isArray(innerValue)) {
        const [objOfInnerValue] = innerValue;
        const indent = ' '.repeat(spacesCount);
        return `${acc}${firstSymbol}${indent}${key}: {\n${getStr(objOfInnerValue, spacesCount + stepForSpace + stepForSpace)}\n${indent}}`;
      }
      if (innerValue.type === 'modified') {
        if (_.isPlainObject(oldValue)) {
          const [keyOfOldValue] = Object.keys(oldValue);
          const value = oldValue[keyOfOldValue];
          return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: {\n${indentInner}${keyOfOldValue}: ${value}\n${indentBeforeCloseBracket}}${indentOut}\n${indentOut}+ ${keys[currentIndex]}: ${newValue}`;
        }
        if (_.isPlainObject(newValue)) {
          const [keyOfNewValue] = Object.keys(newValue);
          const value = newValue[keyOfNewValue];
          return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: ${oldValue}\n${indentOut}+ ${keys[currentIndex]}: {\n${indentInner}${keyOfNewValue}: ${value}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: ${oldValue}\n${indentOut}+ ${keys[currentIndex]}: ${newValue}`;
      }
      if (innerValue.type === 'added') {
        if (_.isPlainObject(oldValue)) {
          const [keyOfNewValue] = Object.keys(oldValue);
          const value = oldValue[keyOfNewValue];
          return `${acc}${firstSymbol}${indentOut}+ ${keys[currentIndex]}: {\n${indentInner}${keyOfNewValue}: ${value}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}+ ${keys[currentIndex]}: ${oldValue}`;
      }
      if (innerValue.type === 'deleted') {
        if (_.isPlainObject(oldValue)) {
          const [keyOfOldValue] = Object.keys(oldValue);
          const value = oldValue[keyOfOldValue];
          return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: {\n${indentInner}${keyOfOldValue}: ${value}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: ${oldValue}`;
      }
      return `${acc}${firstSymbol}${indentForUnchangedValue}${keys[currentIndex]}: ${oldValue}`;
    }, '');
    return `${result}`;
  };
  return `{\n${getStr(data)}\n}`;
};
