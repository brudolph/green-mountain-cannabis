export default function formatQuantity(amount = 0) {
  const options = {
    style: 'unit',
    unit: 'mass-pound',
    unitDisplay: 'long',
  };

  const formatter = amount.toLocaleString('en-US', options);

  return formatter;
}
