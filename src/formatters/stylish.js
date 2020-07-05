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
      key, type, value, value1, value2, children,
    } = node;
    const substrForValue = getSubstr(indentInner, indentBeforeCloseBracket, value);
    const substForValue1 = getSubstr(indentInner, indentBeforeCloseBracket, value1);
    const substrForValue2 = getSubstr(indentInner, indentBeforeCloseBracket, value2);
    switch (type) {
      case 'parent':
        return `${indentForParentKey}${key}: {\n${getStrInStylishType(children, spacesCount + (stepForSpacesCount * 2))}\n${indentBeforeCloseBracket}}`;
      case 'modified':
        return `${indentOut}- ${key}: ${substForValue1}\n${indentOut}+ ${key}: ${substrForValue2}`;
      case 'added':
        return `${indentOut}+ ${key}: ${substrForValue}`;
      case 'deleted':
        return `${indentOut}- ${key}: ${substrForValue}`;
      case 'unchanged':
        return `${indentForUnchangedValue}${key}: ${substrForValue}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return result.join('\n');
};

export default (data) => `{\n${getStrInStylishType(data)}\n}`;
