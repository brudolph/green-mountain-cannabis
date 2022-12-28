import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { rules, permissions } from '../access';

export const ProductCategory = list({
  access: {
    operation: {
      create: permissions.canManageProducts,
      query: permissions.canReadProducts,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
    },
    filter: {
      query: rules.canReadProducts,
      update: rules.canManageProducts,
      delete: rules.canManageProducts,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
  },
});
