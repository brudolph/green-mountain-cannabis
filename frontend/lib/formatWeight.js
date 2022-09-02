export default function formatWeight(weight, qty) {
  if (weight === 'pound' && qty > 1) {
    return 'lbs';
  }
  return 'lb';
}
