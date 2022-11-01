export default function groupBy(array, keys, variable) {
  let i;
  let key;
  let temp;
  let split;
  const data = array.reduce((result, currentValue) => {
    key = '';
    for (i = 0; i < keys.length; i++) {
      key = `${key + currentValue[keys[i]]}_`;
    }
    if (!result[key]) {
      result[key] = 0;
    }
    result[key] += parseFloat(currentValue[variable]);

    return result;
  }, {});
  console.log(data);
  const grouped = [];
  Object.keys(data).forEach((key) => {
    temp = {};
    split = key.split('_');
    for (i = 0; i < split.length - 1; i++) {
      temp[keys[i]] = split[i];
    }
    temp[variable] = data[key];
    grouped.push(temp);
  });
  return grouped;
}
