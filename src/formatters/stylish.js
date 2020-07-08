import _ from 'lodash';

const getSubstr = (beginIndent, endIndent, value) => {
  if (!_.isPlainObject(value)) return value;
  const [key, property] = Object.entries(value).flat();
  return `{\n${beginIndent}${key}: ${property}\n${endIndent}}`;
};

const getIndent = (depth) => {
  const stepsForIndentCount = 4;
  return ' '.repeat(depth * stepsForIndentCount);
};

const getStrInStylishType = (tree) => {
  const iter = (data, depth = 1) => {
    const result = data.map((node) => {
      const stepsForInnerIndentCount = 4;
      const stepsForIndentForChangedValuesCount = 2;
      const indentOutForChangedValues = ' '.repeat((depth * stepsForInnerIndentCount) - stepsForIndentForChangedValuesCount);
      const indentInner = ' '.repeat((depth * stepsForInnerIndentCount) + stepsForInnerIndentCount);
      const indentOutForUnchangedValues = getIndent(depth);
      const indentBeforeCloseBracket = getIndent(depth);
      const indentForParentKey = getIndent(depth);
      const {
        key, type, value, value1, value2, children,
      } = node;
      const substrForValue = getSubstr(indentInner, indentBeforeCloseBracket, value);
      const substForValue1 = getSubstr(indentInner, indentBeforeCloseBracket, value1);
      const substrForValue2 = getSubstr(indentInner, indentBeforeCloseBracket, value2);
      switch (type) {
        case 'parent':
          return `${indentForParentKey}${key}: {\n${iter(children, depth + 1)}\n${indentBeforeCloseBracket}}`;
        case 'modified':
          return `${indentOutForChangedValues}- ${key}: ${substForValue1}\n${indentOutForChangedValues}+ ${key}: ${substrForValue2}`;
        case 'added':
          return `${indentOutForChangedValues}+ ${key}: ${substrForValue}`;
        case 'deleted':
          return `${indentOutForChangedValues}- ${key}: ${substrForValue}`;
        case 'unchanged':
          return `${indentOutForUnchangedValues}${key}: ${substrForValue}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
    return result.join('\n');
  };
  return iter(tree);
};

export default (data) => `{\n${getStrInStylishType(data)}\n}`;
