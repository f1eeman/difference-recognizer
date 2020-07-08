import _ from 'lodash';

const additionalIndentForChangedType = '  ';
const additionalOutIndent = '    ';
const additionalInnerIndent = '        ';

const getIndent = (depth) => {
  if (depth === 1) {
    return '';
  }
  const base = 2;
  return ' '.repeat(base ** depth);
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
      const substrForValue = getSubstr(`${indent}${additionalInnerIndent}`, `${indent}${additionalOutIndent}`, value);
      const substForValue1 = getSubstr(`${indent}${additionalInnerIndent}`, `${indent}${additionalOutIndent}`, value1);
      const substrForValue2 = getSubstr(`${indent}${additionalInnerIndent}`, `${indent}${additionalOutIndent}`, value2);
      switch (type) {
        case 'parent':
          return `${indent}${additionalOutIndent}${key}: {\n${iter(children, depth + 1)}\n${indent}${additionalOutIndent}}`;
        case 'modified':
          return `${indent}${additionalIndentForChangedType}- ${key}: ${substForValue1}\n${indent}${additionalIndentForChangedType}+ ${key}: ${substrForValue2}`;
        case 'added':
          return `${indent}${additionalIndentForChangedType}+ ${key}: ${substrForValue}`;
        case 'deleted':
          return `${indent}${additionalIndentForChangedType}- ${key}: ${substrForValue}`;
        case 'unchanged':
          return `${indent}${additionalOutIndent}${key}: ${substrForValue}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
    return result.join('\n');
  };
  return iter(tree);
};

export default (data) => `{\n${getStrInStylishType(data)}\n}`;
