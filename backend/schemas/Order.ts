import {
  integer,
  select,
  text,
  relationship,
  virtual,
} from '@keystone-6/core/fields';
import { list, graphql } from '@keystone-6/core';
import { isSignedIn, rules } from '../access';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  access: {
    operation: {
      create: isSignedIn,
      update: () => false,
      delete: () => false,
    },
    filter: {
      query: rules.canOrder,
    },
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
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
  },
  description: 'User orders',
});