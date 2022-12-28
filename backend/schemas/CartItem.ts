import { decimal, relationship } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { permissions, rules, isSignedIn } from '../access';


export const CartItem = list({
  access: {
    operation: {
      ...allOperations(allowAll),
      create: isSignedIn,
    },
    filter: {
      query: rules.canOrder,
      update: rules.canOrder,
      delete: rules.canOrder,
    },
  },
  fields: {
    quantity: decimal({
      defaultValue: '0',
      precision: 18,
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
