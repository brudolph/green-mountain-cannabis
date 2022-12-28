import { integer, decimal, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { permissions, rules, isSignedIn } from '../access';

export const Pricing = list({
  access: {
    operation: {
      ...allOperations(allowAll),
      create: isSignedIn,
    },
    filter: {
      query: rules.canReadProducts,
      update: rules.canManageProducts,
      delete: rules.canManageProducts,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    price: decimal({
      validation: { isRequired: true },
      defaultValue: '0',
      precision: 18,
      scale: 2,
      label: 'Price per (lb, oz, g, etc.)'
    }),
    amount: integer({ validation: { isRequired: true }, label: 'Amount needed for discount. Just number no weight abbreviation.' }),
  },
});
