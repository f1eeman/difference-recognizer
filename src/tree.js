import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const allKeys = _.union(keysData1, keysData2).sort();
  const diffs = allKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isPlainObject(value2) && _.isPlainObject(value1)) {
      return { key, type: 'parent', children: buildDiffTree(value1, value2) };
    }
    if (_.hasIn(data1, key) && !_.hasIn(data2, key)) {
      return { key, type: 'deleted', value: value1 };
    }
    if (_.hasIn(data2, key) && !_.hasIn(data1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 };
    }
    return {
      key, type: 'modified', value1, value2,
    };
  });
  return diffs;
};

export default buildDiffTree;
