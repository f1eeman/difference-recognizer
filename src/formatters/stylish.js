import _ from 'lodash';

const getSubstr = (beginIndent, endIndent, value) => {
  if (_.isPlainObject(value)) {
    const [key] = Object.keys(value);
    const innerValue = value[key];
    return `{\n${beginIndent}${key}: ${innerValue}\n${endIndent}}`;
  }
  return `${value}`;
};

const getStrInStylishType = (tree, spacesCount = 4, stepForSpacesCount = 2) => {
  const result = tree.reduce((acc, node) => {
    const firstSymbol = acc.length === 0 ? '' : '\n';
    const spacesBeforeValuesCount = spacesCount - stepForSpacesCount;
    const spacesBeforeInnerValuesCount = spacesCount + (stepForSpacesCount * 2);
    const indentOut = ' '.repeat(spacesBeforeValuesCount);
    const indentInner = ' '.repeat(spacesBeforeInnerValuesCount);
    const indentBeforeCloseBracket = ' '.repeat(spacesCount);
    const indentForUnchangedValue = ' '.repeat(spacesCount);
    const indentForParentKey = ' '.repeat(spacesCount);
    const {
      key, type, oldValue, newValue, children,
    } = node;
    const substForOldValue = getSubstr(indentInner, indentBeforeCloseBracket, oldValue);
    const substrForNewValue = getSubstr(indentInner, indentBeforeCloseBracket, newValue);
    switch (type) {
      case 'parent':
        return `${acc}${firstSymbol}${indentForParentKey}${key}: {\n${getStrInStylishType(children, spacesCount + (stepForSpacesCount * 2))}\n${indentBeforeCloseBracket}}`;
      case 'modified':
        return `${acc}${firstSymbol}${indentOut}- ${key}: ${substForOldValue}\n${indentOut}+ ${key}: ${substrForNewValue}`;
      case 'added':
        return `${acc}${firstSymbol}${indentOut}+ ${key}: ${substrForNewValue}`;
      case 'deleted':
        return `${acc}${firstSymbol}${indentOut}- ${key}: ${substForOldValue}`;
      case 'unchanged':
        return `${acc}${firstSymbol}${indentForUnchangedValue}${key}: ${substForOldValue}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  }, '');
  return `${result}`;
};

export default (data) => `{\n${getStrInStylishType(data)}\n}`;
