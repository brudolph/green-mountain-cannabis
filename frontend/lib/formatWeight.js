export default function formatWeight(weight, qty) {
  if (weight === 'pound') {
    if (qty > 1) {
      return 'lbs';
    }
    return 'lb';
  }
  if (weight === 'gram') {
    return 'gm';
  }
  if (weight === 'ounce') {
    return 'oz';
  }
}
