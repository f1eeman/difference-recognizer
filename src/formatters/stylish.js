import _ from 'lodash';

const additionalIndentForChangedValues = ' '.repeat(2);
const additionalOutIndent = ' '.repeat(4);
const additionalInnerIndent = ' '.repeat(8);

const getIndent = (depth) => '    '.repeat(depth);

const getSubstr = (value, depth) => {
  if (!_.isPlainObject(value)) return value;
  const [key, property] = Object.entries(value).flat();
  const indent = getIndent(depth);
  return `{\n${indent}${additionalInnerIndent}${key}: ${property}\n${indent}${additionalOutIndent}}`;
};

const getStrings = (node, depth, callback) => {
  const indent = getIndent(depth);
  const {
    key, type, value, value1, value2, children,
  } = node;
  const substrForValue = getSubstr(value, depth);
  const substForValue1 = getSubstr(value1, depth);
  const substrForValue2 = getSubstr(value2, depth);
  switch (type) {
    case 'parent':
      return [`${indent}${additionalOutIndent}${key}: {\n${callback(children, depth + 1)}`, `${indent}${additionalOutIndent}}`];
    case 'modified':
      return [`${indent}${additionalIndentForChangedValues}- ${key}: ${substForValue1}`, `${indent}${additionalIndentForChangedValues}+ ${key}: ${substrForValue2}`];
    case 'added':
      return [`${indent}${additionalIndentForChangedValues}+ ${key}: ${substrForValue}`];
    case 'deleted':
      return [`${indent}${additionalIndentForChangedValues}- ${key}: ${substrForValue}`];
    case 'unchanged':
      return [`${indent}${additionalOutIndent}${key}: ${substrForValue}`];
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

const getStrInStylishType = (tree) => {
  const iter = (children, depth = 0) => children.flatMap((child) => getStrings(child, depth, iter)).join('\n');
  return iter(tree);
};

export default (data) => `{\n${getStrInStylishType(data)}\n}`;
