import _ from 'lodash';

export default (data) => {
  const getStr = (obj, spacesCount = 4, stepForSpace = 2) => {
    const keys = Object.keys(obj);
    const entries = Object.entries(obj);
    const result = entries.reduce((acc, [key, innerValue], currentIndex) => {
      const firstSymbol = acc.length === 0 ? '' : '\n';
      if (Array.isArray(innerValue)) {
        const [objOfInnerValue] = innerValue;
        const indent = ' '.repeat(spacesCount);
        return `${acc}${firstSymbol}${indent}${key}: {\n${getStr(objOfInnerValue, spacesCount + stepForSpace + stepForSpace)}\n${indent}}`;
      }
      if (innerValue.type === 'modified') {
        const spacesBeforeModifiedValuesCount = spacesCount - stepForSpace;
        const spacesBeforeInnerModifiedValuesCount = spacesCount + stepForSpace + stepForSpace;
        const spacesBeforeInnerCloseBracketCount = spacesCount;
        const indentOut = ' '.repeat(spacesBeforeModifiedValuesCount);
        const indentInner = ' '.repeat(spacesBeforeInnerModifiedValuesCount);
        const indentBeforeCloseBracket = ' '.repeat(spacesBeforeInnerCloseBracketCount);
        const [oldKey, newKey] = Object.keys(obj[keys[currentIndex]]);
        const oldValue = obj[keys[currentIndex]][oldKey];
        const newValue = obj[keys[currentIndex]][newKey];
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
        const spacesBeforeAddedValuesCount = spacesCount - stepForSpace;
        const spacesBeforeInnerAddedValuesCount = spacesCount + stepForSpace + stepForSpace;
        const spacesBeforeInnerCloseBracketCount = spacesCount;
        const indentOut = ' '.repeat(spacesBeforeAddedValuesCount);
        const indentInner = ' '.repeat(spacesBeforeInnerAddedValuesCount);
        const indentBeforeCloseBracket = ' '.repeat(spacesBeforeInnerCloseBracketCount);
        const [newKey] = Object.keys(obj[keys[currentIndex]]);
        const newValue = obj[keys[currentIndex]][newKey];
        if (_.isPlainObject(newValue)) {
          const [keyOfNewValue] = Object.keys(newValue);
          const value = newValue[keyOfNewValue];
          return `${acc}${firstSymbol}${indentOut}+ ${keys[currentIndex]}: {\n${indentInner}${keyOfNewValue}: ${value}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}+ ${keys[currentIndex]}: ${newValue}`;
      }
      if (innerValue.type === 'deleted') {
        const spacesBeforeDeletedValuesCount = spacesCount - stepForSpace;
        const spacesBeforeInnerDeletedValuesCount = spacesCount + stepForSpace + stepForSpace;
        const spacesBeforeInnerCloseBracketCount = spacesCount;
        const indentOut = ' '.repeat(spacesBeforeDeletedValuesCount);
        const indentInner = ' '.repeat(spacesBeforeInnerDeletedValuesCount);
        const indentBeforeCloseBracket = ' '.repeat(spacesBeforeInnerCloseBracketCount);
        const [oldKey] = Object.keys(obj[keys[currentIndex]]);
        const oldValue = obj[keys[currentIndex]][oldKey];
        if (_.isPlainObject(oldValue)) {
          const [keyOfOldValue] = Object.keys(oldValue);
          const value = oldValue[keyOfOldValue];
          return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: {\n${indentInner}${keyOfOldValue}: ${value}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: ${oldValue}`;
      }
      const spacesBeforeUnchangedValuesCount = spacesCount;
      const indent = ' '.repeat(spacesBeforeUnchangedValuesCount);
      const [oldKey] = Object.keys(obj[keys[currentIndex]]);
      const oldValue = obj[keys[currentIndex]][oldKey];
      return `${acc}${firstSymbol}${indent}${keys[currentIndex]}: ${oldValue}`;
    }, '');
    return `${result}`;
  };
  return `{\n${getStr(data)}\n}`;
};
