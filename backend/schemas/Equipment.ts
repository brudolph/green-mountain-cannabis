import { virtual, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { graphql } from '@graphql-ts/schema';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { permissions, rules, isSignedIn } from '../access';

export const Machine = list({
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
