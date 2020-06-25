import _ from 'lodash';

const genDiff = (dataBefore, dataAfter) => {
  const keysDataBefore = Object.keys(dataBefore);
  const keysDataAfter = Object.keys(dataAfter);
  const allKeys = _.union(keysDataBefore, keysDataAfter);
  const diffs = allKeys.map((key) => {
    const newValue = dataAfter[key];
    const oldValue = dataBefore[key];
    if (_.isPlainObject(newValue) && _.isPlainObject(oldValue)) {
      return { key, type: 'parent', children: genDiff(oldValue, newValue) };
    }
    if (_.hasIn(dataBefore, key) && _.hasIn(dataAfter, key)) {
      if (oldValue === newValue) {
        return { key, type: 'unchanged', value: oldValue };
      }
      return {
        key, type: 'modified', oldValue, newValue,
      };
    }
    if (_.hasIn(dataBefore, key)) {
      return { key, type: 'deleted', value: oldValue };
    }
    return { key, type: 'added', value: newValue };
  });
  return diffs;
};

export default genDiff;
