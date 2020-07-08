import _ from 'lodash';

const additionalIndentForChangedValues = '  ';
const additionalOutIndent = '    ';
const additionalInnerIndent = '        ';

const getIndent = (depth) => '    '.repeat(depth);

const getSubstr = (beginIndent, endIndent, value) => {
  if (!_.isPlainObject(value)) return value;
  const [key, property] = Object.entries(value).flat();
  return `{\n${beginIndent}${key}: ${property}\n${endIndent}}`;
};

const getStrInStylishType = (tree) => {
  const iter = (data, depth = 0) => {
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
          return `${indent}${additionalIndentForChangedValues}- ${key}: ${substForValue1}\n${indent}${additionalIndentForChangedValues}+ ${key}: ${substrForValue2}`;
        case 'added':
          return `${indent}${additionalIndentForChangedValues}+ ${key}: ${substrForValue}`;
        case 'deleted':
          return `${indent}${additionalIndentForChangedValues}- ${key}: ${substrForValue}`;
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
