import {
  decimal,
  text,
  relationship,
  virtual,
} from '@keystone-6/core/fields';
import { list, graphql } from '@keystone-6/core';
import { isSignedIn, permissions, rules } from '../access';
import formatMoney from '../lib/formatMoney';
import { allOperations, allowAll } from '@keystone-6/core/access';


export const Order = list({
  access: {
    operation: {
      create: permissions.canManageOrders,
      update: () => false,
      delete: () => false,
      query: () => true,
    },
    filter: { query: rules.canOrder },
  },
  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          return `${item.id}`;
        },
      }),
      label: 'Order Id'
    }),
    total: decimal(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    orderDate: text(),
    user: relationship({ ref: 'User.orders' }),
  },
  description: 'User orders',
});