export default function formatWeight(weight, qty) {
  if (weight === 'pound') {
    if (qty > 1) {
      return 'lbs';
    }
    return 'lb';
  }
  if (weight === 'gram') {
    if (qty > 1) {
      return 'grams';
    }
    return 'gram';
  }
  if (weight === 'ounce') {
    if (qty > 1) {
      return 'ounces';
    }
    return 'ounce';
  }
}
