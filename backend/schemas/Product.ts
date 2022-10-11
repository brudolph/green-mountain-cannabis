import { checkbox, decimal, relationship, select, multiselect, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { permissions } from '../access';

export const Product = list({
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
    name: text({ validation: { isRequired: true } }),
    slug: text({ isIndexed: 'unique', label: 'Pretty URL (Leave blank. This will be automatically filled once saved)' }),
    inventory: decimal({
      defaultValue: '1.0',
      precision: 18,
      scale: 2,
      label: 'Inventory'
    }),
    price: decimal({
      defaultValue: '0.00',
      precision: 18,
      scale: 2,
    }),
    priceThreshold: relationship({
      ref: 'Pricing',
      many: true,
      ui: {
        createView: { fieldMode: 'edit' },
        inlineCreate: { fields: ['name', 'price', 'amount', 'weight', 'threshold'] },
        inlineEdit: { fields: ['name', 'price', 'amount', 'weight', 'threshold'] },
      },
      label: 'Quantity Discount'
    }),
    recreational: checkbox({
      label: 'Recreational Product?'
    }),
    medical: checkbox({
      label: 'Medical Product?'
    }),
    hotDeal: checkbox({ label: 'Hot Deal?' }),
    category: relationship({
      ref: 'Category.product',
    }),
    photos: relationship({
      ref: 'ProductImage.product',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    flower: relationship({
      ref: 'FlowerTrimFreshFrozen',
      label: 'Flower/Trim/Fresh Frozen - select or create new'
    }),
    oil: relationship({
      ref: 'Oil',
      label: 'Oil - select or create new'
    }),
    concentrate: relationship({
      ref: 'Concentrate',
      label: 'Concentrate - select or create new'
    }),
    preRoll: relationship({
      ref: 'PreRoll',
      label: 'Pre-roll - select or create new'
    }),
    machine: relationship({
      ref: 'Machine',
      label: 'Equipment - select or create new'
    }),
    vendor: relationship({
      ref: 'Vendor.product',
      many: false,
    }),
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
  ui: {
    listView: {
      initialColumns: ['name', 'hotDeal', 'category', 'status', 'inventory'],
    },
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
