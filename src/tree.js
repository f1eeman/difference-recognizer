import _ from 'lodash';

const buildDiffTree = (dataBefore, dataAfter) => {
  const keysDataBefore = Object.keys(dataBefore);
  const keysDataAfter = Object.keys(dataAfter);
  const allKeys = _.union(keysDataBefore, keysDataAfter).sort();
  const diffs = allKeys.map((key) => {
    const newValue = dataAfter[key];
    const oldValue = dataBefore[key];
    if (_.isPlainObject(newValue) && _.isPlainObject(oldValue)) {
      return { key, type: 'parent', children: buildDiffTree(oldValue, newValue) };
    }
    if (_.hasIn(dataBefore, key) && !_.hasIn(dataAfter, key)) {
      return { key, type: 'deleted', currentValue: oldValue };
    }
    if (_.hasIn(dataAfter, key) && !_.hasIn(dataBefore, key)) {
      return { key, type: 'added', currentValue: newValue };
    }
    if (oldValue === newValue) {
      return { key, type: 'unchanged', currentValue: oldValue };
    }
    return {
      key, type: 'modified', oldValue, newValue,
    };
  });
  return diffs;
};

export default buildDiffTree;
