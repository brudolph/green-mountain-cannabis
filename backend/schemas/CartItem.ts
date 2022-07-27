import { decimal, relationship } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const CartItem = list({
  fields: {
    quantity: decimal({
      defaultValue: '0.01',
      precision: 12,
      scale: 2,
      validation: { isRequired: true }
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' })
  },
  ui: {
    listView: {
      initialColumns: ['product', 'quantity', 'user'],
    },
  },
});
