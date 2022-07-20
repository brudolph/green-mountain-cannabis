import { integer, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const Pricing = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    price: integer({ validation: { isRequired: true }, label: 'Price per (lb, oz, g)' }),
    amount: integer({ validation: { isRequired: true }, label: 'Weight threshold' }),
    weight: select({
      options: [
        { label: 'Gram', value: 'gram' },
        { label: 'Ounce', value: 'ounce' },
        { label: 'Pound', value: 'pound' },
      ],
      validation: { isRequired: true },
      defaultValue: 'Pound',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    threshold: select({
      options: [
        { label: 'Less than <', value: '<' },
        { label: 'Greater than >', value: '>' },
      ],
      defaultValue: '>',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    product: relationship({
      ref: 'Product.price_threshold',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
      }
    }),
  },
});
