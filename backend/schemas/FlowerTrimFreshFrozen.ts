import { virtual, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { graphql } from '@graphql-ts/schema';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { rules, isSignedIn } from '../access';

export const FlowerTrimFreshFrozen = list({
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
          const { product } = await context.query.FlowerTrimFreshFrozen.findOne({
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
    weight: select({
      options: [
        { label: 'Gram', value: 'gram' },
        { label: 'Ounce', value: 'ounce' },
        { label: 'Pound', value: 'pound' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    potency: text({
      label: 'Potency (%)'
    }),
    strain: select({
      options: [
        { label: 'Indica', value: 'Indica' },
        { label: 'Indica Hybrid', value: 'Indica Hybrid' },
        { label: 'Sativa', value: 'Sativa' },
        { label: 'Sativa Hybrid', value: 'Sativa Hybrid' },
        { label: 'Hybrid', value: 'Hybrid' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    trimMethod: select({
      options: [
        { label: 'Hand', value: 'Hand' },
        { label: 'Machine', value: 'Machine' },
        { label: 'Machine + Hand', value: 'Machine + Hand' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    environment: select({
      options: [
        { label: 'Indoor', value: 'Indoor' },
        { label: 'Greenhouse', value: 'Greenhouse' },
        { label: 'Outdoor', value: 'Outdoor' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
  },
  ui: {
    label: 'Flower/Trim/Fresh Frozen',
    listView: {
      initialColumns: ['label', 'potency', 'strain'],
    },
  },
});
