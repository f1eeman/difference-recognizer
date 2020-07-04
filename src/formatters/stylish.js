import _ from 'lodash';

const getSubstr = (beginIndent, endIndent, value) => {
  if (_.isPlainObject(value)) {
    const [key, property] = Object.entries(value).flat();
    return `{\n${beginIndent}${key}: ${property}\n${endIndent}}`;
  }
  return value;
};

const getStrInStylishType = (tree, spacesCount = 4, stepForSpacesCount = 2) => {
  const result = tree.flatMap((node) => {
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
        return `${indentForParentKey}${key}: {\n${getStrInStylishType(children, spacesCount + (stepForSpacesCount * 2))}\n${indentBeforeCloseBracket}}`;
      case 'modified':
        return `${indentOut}- ${key}: ${substForOldValue}\n${indentOut}+ ${key}: ${substrForNewValue}`;
      case 'added':
        return `${indentOut}+ ${key}: ${substrForNewValue}`;
      case 'deleted':
        return `${indentOut}- ${key}: ${substForOldValue}`;
      case 'unchanged':
        return `${indentForUnchangedValue}${key}: ${substForOldValue}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return result.join('\n');
};

export default (data) => `{\n${getStrInStylishType(data)}\n}`;
