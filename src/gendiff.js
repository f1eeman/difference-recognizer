import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

export const getExtName = (fileName) => path.extname(fileName).slice(1);

export const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);

export const getData = (filePath) => fs.readFileSync(filePath, 'utf8');

export const getParsedData = (data, extName) => parse(data, extName);

export const genDiff = (dataBefore, dataAfter) => {
  const keysDataBefore = Object.keys(dataBefore);
  const keysDataAfter = Object.keys(dataAfter);
  const allKeys = _.union([...keysDataBefore, ...keysDataAfter]);

  const diffs = allKeys.reduce((acc, key) => {
    const newValue = dataAfter[key];
    const oldValue = dataBefore[key];
    if (_.isPlainObject(newValue) && _.isPlainObject(oldValue)) {
      return { ...acc, [key]: [genDiff(oldValue, newValue)] };
    }
    if (_.hasIn(dataBefore, key) && _.hasIn(dataAfter, key)) {
      if (oldValue === newValue) {
        return { ...acc, [key]: { value: oldValue, type: 'unchanged' } };
      }
      return { ...acc, [key]: { value: oldValue, type: 'modified' } };
    }
    if (_.hasIn(dataBefore, key)) {
      return { ...acc, [key]: { value: oldValue, type: 'deleted' } };
    }
    return { ...acc, [key]: { value: newValue, type: 'added' } };
  }, {});
  return diffs;
};

export const getDiff = (diff, dataBefore, dataAfter) => {
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
