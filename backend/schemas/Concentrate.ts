import { virtual, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { graphql } from '@graphql-ts/schema';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { permissions, rules, isSignedIn } from '../access';

export const Concentrate = list({
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
          const { product } = await context.query.Concentrate.findOne({
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
        { label: 'Unit', value: 'unit' },
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
        { label: 'Glass Syringe', value: 'Glass Syringe' },
        { label: 'Wax', value: 'Wax' },
        { label: 'Shatter', value: 'Shatter' },
        { label: 'Live Resin', value: 'Live Resin' },
        { label: 'Live Badder', value: 'Live Badder' },
        { label: 'Rosin', value: 'Rosin' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
  },
  ui: {
    label: 'Concentrates',
    listView: {
      initialColumns: ['label', 'potency', 'strain', 'type'],
    },
  },
});
