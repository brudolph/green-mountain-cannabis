export default function groupBy(array, keys, variable) {
  let i;
  let key;
  let temp;
  let split;

  const data = array.reduce((result, currentValue) => {
    key = '';
    for (i = 0; i < keys.length; i += 1) {
      key = `${key + currentValue[keys[i]]}_`;
    }
    if (!result[key]) {
      result[key] = 0;
    }
    result[key] += parseFloat(currentValue[variable]);

    return result;
  }, {});

  const grouped = [];

  Object.keys(data).forEach((keyed) => {
    temp = {};
    split = keyed.split('_');
    for (i = 0; i < split.length - 1; i += 1) {
      temp[keys[i]] = split[i];
    }
    temp[variable] = data[keyed];
    grouped.push(temp);
  });
  return grouped;
}
