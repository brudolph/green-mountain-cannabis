import { virtual, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { isSignedIn, rules } from '../access';
import { graphql } from '@graphql-ts/schema';
import { permissions } from '../access';

export const Machine = list({
  access: {
    operation: {
      create: permissions.canManageProducts,
    },
    filter: {
      query: permissions.canManageProducts,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
    }
  },
  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { product } = await context.query.Machine.findOne({
            where: { id: item.id.toString() },
            query: 'product { name }',
          });
          return product && product.name;
        },
      }),
    }),
    product: relationship({
      ref: 'Product',
      many: false,
    }),
    model: text({}),
    modelYear: text({}),
    condition: select({
      options: [
        { label: 'New', value: 'New' },
        { label: 'Used Good', value: 'Used Good' },
        { label: 'Used Fair', value: 'Used Fair' },
        { label: 'Used Poor', value: 'Used Poor' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
  },
  ui: {
    label: 'Equipment',
    listView: {
      initialColumns: ['label', 'model', 'modelYear', 'condition'],
    },
  },
});
