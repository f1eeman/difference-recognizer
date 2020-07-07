import _ from 'lodash';

const getSubstr = (beginIndent, endIndent, value) => {
  if (!_.isPlainObject(value)) return value;
  const [key, property] = Object.entries(value).flat();
  return `{\n${beginIndent}${key}: ${property}\n${endIndent}}`;
};

const getIndent = (isUnchangedValues, isNestedValues, isParentKey, isCloseBracket, depth) => {
  const stepForSpacesCount = 4;
  const stepForSpacesForChangedValuesCount = 2;
  if (isUnchangedValues || isParentKey || isCloseBracket) {
    return ' '.repeat(depth * stepForSpacesCount);
  }
  if (isNestedValues) {
    return ' '.repeat((depth * stepForSpacesCount) + stepForSpacesCount);
  }
  return ' '.repeat((depth * stepForSpacesCount) - stepForSpacesForChangedValuesCount);
};

const getStrInStylishType = (tree, depth = 1) => {
  const result = tree.map((node) => {
    const indentOut = getIndent(false, false, false, false, depth);
    const indentInner = getIndent(false, true, false, false, depth);
    const indentOutForUnchangedValues = getIndent(true, false, false, false, depth);
    const indentBeforeCloseBracket = getIndent(false, false, false, true, depth);
    const indentForParentKey = getIndent(false, false, true, false, depth);
    const {
      key, type, value, value1, value2, children,
    } = node;
    const substrForValue = getSubstr(indentInner, indentBeforeCloseBracket, value);
    const substForValue1 = getSubstr(indentInner, indentBeforeCloseBracket, value1);
    const substrForValue2 = getSubstr(indentInner, indentBeforeCloseBracket, value2);
    switch (type) {
      case 'parent':
        return `${indentForParentKey}${key}: {\n${getStrInStylishType(children, depth + 1)}\n${indentBeforeCloseBracket}}`;
      case 'modified':
        return `${indentOut}- ${key}: ${substForValue1}\n${indentOut}+ ${key}: ${substrForValue2}`;
      case 'added':
        return `${indentOut}+ ${key}: ${substrForValue}`;
      case 'deleted':
        return `${indentOut}- ${key}: ${substrForValue}`;
      case 'unchanged':
        return `${indentOutForUnchangedValues}${key}: ${substrForValue}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return result.join('\n');
};

export default (data) => `{\n${getStrInStylishType(data)}\n}`;
