import { integer, select, text, relationship, decimal } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { isSignedIn, permissions, rules } from '../access';
import { allOperations, allowAll } from '@keystone-6/core/access';


export const OrderItem = list({
  // access: {
  //   operation: {
  //     create: permissions.canManageOrders,
  //     update: () => false,
  //     delete: () => false,
  //     query: () => true,
  //   },
  //   filter: {
  //     query: rules.canManageOrderItems,
  //   },
  // },
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    price: decimal(),
    weight: text(),
    quantity: decimal(),
    order: relationship({ ref: 'Order.items' }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'quantity', 'price'],
    },
  },
});