export default function getObjPropTarget(object, target) {
  const arr = target.split('.');
  for (let i = 0; i < arr.length; i += 1) {
    if (object) {
      // eslint-disable-next-line no-param-reassign
      object = object[arr[i]];
    }
  }
  return object;
}
