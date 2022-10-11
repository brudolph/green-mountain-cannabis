import { checkbox, integer, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { isSignedIn, rules } from '../access';


export const Product2 = list({
  access: {
    operation: {
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
    slug: text({ isIndexed: 'unique', label: 'Pretty URL (Leave blank. This will be automatically filled once saved)' }),
    hotdeal: checkbox({ defaultValue: false, label: 'Hot Deal?' }),
    price: integer(),
    potency: text({
      defaultValue: '1.0',
      label: 'Potency (%)'
    }),
    producttype: select({
      options: [
        { label: 'Recreational', value: 'recreational' },
        { label: 'Medical', value: 'medical' },
      ],
      defaultValue: 'recreational',
      ui: {
        displayMode: 'segmented-control',
      },
      label: 'Product Type'
    }),
    variants: relationship({ ref: 'Variant.product', many: true }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      const { name, slug } = resolvedData;
      if (name) {
        return {
          ...resolvedData,
          slug: name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '-')
            .replace(/^-+|-+$/g, '')
        }
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    }
  },
});
