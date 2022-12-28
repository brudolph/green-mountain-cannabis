export default function formatQuantity(amount = 0) {
  const formatter = Number.parseFloat(amount).toFixed(2);

  return formatter;
}
