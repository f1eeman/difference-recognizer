import _ from 'lodash';
import { genDiff, getParsedData } from '../tools/utilities.js';

export default (fileName1, fileName2) => {
  const dataBefore = getParsedData(fileName1);
  const dataAfter = getParsedData(fileName2);
  const diff = genDiff(dataBefore, dataAfter);
  const getStr = (obj, data1, data2, spacesCount = 4, stepForSpace = 2) => {
    const keys = Object.keys(obj);
    const entries = Object.entries(obj);

    const result = entries.reduce((acc, [key, innerValue], currentIndex) => {
      const firstSymbol = acc.length === 0 ? '' : '\n';
      if (Array.isArray(innerValue)) {
        const [objOfInnerValue] = innerValue;

        const indent = ' '.repeat(spacesCount);

        return `${acc}${firstSymbol}${indent}${key}: {\n${getStr(objOfInnerValue, data1[key], data2[key], spacesCount + stepForSpace + stepForSpace)}\n${indent}}`;
      }

      if (innerValue.type === 'modified') {
        const spacesBeforeDeletedValesCount = spacesCount - stepForSpace;
        const spacesBeforeInnerDeletedValesCount = spacesCount + stepForSpace + stepForSpace;
        const spacesBeforeInnerCloseBracketCount = spacesCount;
        const indentOut = ' '.repeat(spacesBeforeDeletedValesCount);
        const indentInner = ' '.repeat(spacesBeforeInnerDeletedValesCount);
        const indentBeforeCloseBracket = ' '.repeat(spacesBeforeInnerCloseBracketCount);

        if (_.isPlainObject(data1[keys[currentIndex]])) {
          const [oldKey] = Object.keys(data1[keys[currentIndex]]);
          const oldValue = data1[keys[currentIndex]][oldKey];
          return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: {\n${indentInner}${oldKey}: ${oldValue}\n${indentBeforeCloseBracket}}${indentOut}\n${indentOut}+ ${keys[currentIndex]}: ${data2[keys[currentIndex]]}`;
        }
        if (_.isPlainObject(data2[keys[currentIndex]])) {
          const [newKey] = Object.keys(data2[keys[currentIndex]]);
          const newValue = data2[keys[currentIndex]][newKey];
          return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: ${data1[keys[currentIndex]]}\n${indentOut}+ ${keys[currentIndex]}: {\n${indentInner}${newKey}: ${newValue}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: ${data1[keys[currentIndex]]}\n${indentOut}+ ${keys[currentIndex]}: ${data2[keys[currentIndex]]}`;
      }

      if (innerValue.type === 'added') {
        const spacesBeforeDeletedValesCount = spacesCount - stepForSpace;
        const spacesBeforeInnerDeletedValesCount = spacesCount + stepForSpace + stepForSpace;
        const spacesBeforeInnerCloseBracketCount = spacesCount;
        const indentOut = ' '.repeat(spacesBeforeDeletedValesCount);
        const indentInner = ' '.repeat(spacesBeforeInnerDeletedValesCount);
        const indentBeforeCloseBracket = ' '.repeat(spacesBeforeInnerCloseBracketCount);

        if (_.isPlainObject(data2[keys[currentIndex]])) {
          const [newKey] = Object.keys(data2[keys[currentIndex]]);
          const newValue = data2[keys[currentIndex]][newKey];
          return `${acc}${firstSymbol}${indentOut}+ ${keys[currentIndex]}: {\n${indentInner}${newKey}: ${newValue}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}+ ${keys[currentIndex]}: ${data2[keys[currentIndex]]}`;
      }

      if (innerValue.type === 'deleted') {
        const spacesBeforeDeletedValesCount = spacesCount - stepForSpace;
        const spacesBeforeInnerDeletedValesCount = spacesCount + stepForSpace;
        const spacesBeforeInnerCloseBracketCount = spacesCount;
        const indentOut = ' '.repeat(spacesBeforeDeletedValesCount);
        const indentInner = ' '.repeat(spacesBeforeInnerDeletedValesCount);
        const indentBeforeCloseBracket = ' '.repeat(spacesBeforeInnerCloseBracketCount);

        if (_.isPlainObject(data1[keys[currentIndex]])) {
          const [newKey] = Object.keys(data1[keys[currentIndex]]);
          const newValue = data1[keys[currentIndex]][newKey];
          return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: {\n${indentInner}${newKey}: ${newValue}\n${indentBeforeCloseBracket}}`;
        }
        return `${acc}${firstSymbol}${indentOut}- ${keys[currentIndex]}: ${data1[keys[currentIndex]]}`;
      }

      const spacesBeforeUnchangedValesCount = spacesCount;
      const indent = ' '.repeat(spacesBeforeUnchangedValesCount);

      if (_.isPlainObject(data1[keys[currentIndex]])) {
        const [newKey] = Object.keys(data1[keys[currentIndex]]);
        const newValue = data1[keys[currentIndex]][newKey];
        return `${acc}${firstSymbol}${indent}${keys[currentIndex]}: {${newKey}: ${newValue}}`;
      }
      return `${acc}${firstSymbol}${indent}${keys[currentIndex]}: ${data1[keys[currentIndex]]}`;
    }, '');

    return `${result}`;
  };
  return `{\n${getStr(diff, dataBefore, dataAfter)}\n}`;
};
