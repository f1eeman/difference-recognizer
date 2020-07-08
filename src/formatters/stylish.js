import _ from 'lodash';

const additionalIndentForUnchangedValues = '  ';
const additionalIndentForParentKey = '  ';
const additionalIndentForCloseBracket = '  ';
const additionalInnerIndent = '      ';

const getIndent = (depth) => {
  switch (depth) {
    case 1:
      return ' '.repeat(2);
    case 2:
      return ' '.repeat(6);
    case 3:
      return ' '.repeat(10);
    default:
      throw new Error(`Unknown type: ${depth}`);
  }
};

const getSubstr = (beginIndent, endIndent, value) => {
  if (!_.isPlainObject(value)) return value;
  const [key, property] = Object.entries(value).flat();
  return `{\n${beginIndent}${key}: ${property}\n${endIndent}}`;
};

const getStrInStylishType = (tree) => {
  const iter = (data, depth = 1) => {
    const result = data.map((node) => {
      const indent = getIndent(depth);
      const {
        key, type, value, value1, value2, children,
      } = node;
      const substrForValue = getSubstr(`${indent}${additionalInnerIndent}`, `${indent}${additionalIndentForCloseBracket}`, value);
      const substForValue1 = getSubstr(`${indent}${additionalInnerIndent}`, `${indent}${additionalIndentForCloseBracket}`, value1);
      const substrForValue2 = getSubstr(`${indent}${additionalInnerIndent}`, `${indent}${additionalIndentForCloseBracket}`, value2);
      switch (type) {
        case 'parent':
          return `${indent}${additionalIndentForParentKey}${key}: {\n${iter(children, depth + 1)}\n${indent}${additionalIndentForCloseBracket}}`;
        case 'modified':
          return `${indent}- ${key}: ${substForValue1}\n${indent}+ ${key}: ${substrForValue2}`;
        case 'added':
          return `${indent}+ ${key}: ${substrForValue}`;
        case 'deleted':
          return `${indent}- ${key}: ${substrForValue}`;
        case 'unchanged':
          return `${indent}${additionalIndentForUnchangedValues}${key}: ${substrForValue}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
    return result.join('\n');
  };
  return iter(tree);
};

export default (data) => `{\n${getStrInStylishType(data)}\n}`;
