import { integer, decimal, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const Pricing = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    price: decimal({
      validation: { isRequired: true },
      defaultValue: '0.00',
      precision: 18,
      scale: 2,
      label: 'Price per (lb, oz, g)'
    }),
    amount: integer({ validation: { isRequired: true }, label: 'Amount needed for discount. Just number no weight abbreviation.' }),
  },
});
