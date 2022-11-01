import { virtual, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { isSignedIn, rules } from '../access';
import { graphql } from '@graphql-ts/schema';
import { permissions } from '../access';

export const PreRoll = list({
  access: {
    operation: {
      create: permissions.canManageProducts,
    },
    filter: {
      query: permissions.canReadProducts,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
    }
  },
  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { product } = await context.query.PreRoll.findOne({
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
    size: select({
      options: [
        { label: 'Small', value: 'Small' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Large', value: 'Large' },
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
    type: select({
      options: [
        { label: 'All Flower', value: 'All Flower' },
        { label: 'Trim/Flower Mix', value: 'Trim/Flower Mix' },
        { label: 'Infused', value: 'Infused' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    tube: select({
      options: [
        { label: 'Tube', value: 'Tube' },
        { label: 'No Tube', value: 'No Tube' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
  },
  ui: {
    label: 'Pre-roll',
    listView: {
      initialColumns: ['label', 'potency', 'strain', 'type'],
    },
  },
});
