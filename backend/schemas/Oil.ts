import { virtual, relationship, select, text, checkbox } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { permissions } from '../access';
import { graphql } from '@graphql-ts/schema';

export const Oil = list({
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
          const { product } = await context.query.Oil.findOne({
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
      defaultValue: 'pound',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    potency: text({
      label: 'Potency (%)'
    }),
    cbd: checkbox({ label: 'CBD Product?' }),
    oilType: select({
      options: [
        { label: 'Distillate', value: 'Distillate' },
        { label: 'Crude', value: 'Crude' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    solventUsed: select({
      options: [
        { label: 'Butane', value: 'Butane' },
        { label: 'Ethanol', value: 'Ethanol' },
        { label: 'CO2', value: 'CO2' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['label', 'potency', 'oilType'],
    },
  },
});
