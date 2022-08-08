import { checkbox, decimal, integer, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { isSignedIn, rules } from '../access';

export const Product = list({
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
    slug: text({ label: 'Pretty URL' }),
    hotdeal: checkbox(),
    inventory: decimal({
      defaultValue: '1.0',
      precision: 18,
      scale: 2,
      validation: {
        isRequired: true,
      },
      label: 'Inventory (by weight)'
    }),
    producttype: select({
      options: [
        { label: 'Recreational', value: 'Recreational' },
        { label: 'Medical', value: 'Medical' },
      ],
      validation: { isRequired: true },
      defaultValue: 'Recreational',
      ui: {
        displayMode: 'segmented-control',
      },
      label: 'Product Type'
    }),
    productcategory: select({
      options: [
        { label: 'Flower', value: 'Flower' },
        { label: 'Pre Rolls', value: 'Pre Rolls' },
        { label: 'Concentrates', value: 'Concentrates' },
        { label: 'Trim', value: 'Trim' },
        { label: 'Fresh Frozen', value: 'Fresh Frozen' },
        { label: 'Oil', value: 'Oil' },
        { label: 'CBD Oils and Isolates', value: 'CBD Oils and Isolates' },
        { label: 'Grow & Lab Equipment', value: 'Grow & Lab Equipment' },
      ],
      validation: { isRequired: true },
      defaultValue: 'Flower',
      ui: {
        displayMode: 'segmented-control',
      },
      label: 'Product Category'
    }),
    weight: select({
      options: [
        { label: 'Gram', value: 'gram' },
        { label: 'Ounce', value: 'ounce' },
        { label: 'Pound', value: 'pound' },
      ],
      validation: { isRequired: true },
      defaultValue: 'Pound',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    potency: text({
      defaultValue: '1.0',
      validation: {
        isRequired: true,
      },
      label: 'Potency (%)'
    }),
    strain: select({
      options: [
        { label: 'Indica', value: 'Indica' },
        { label: 'Hybrid Indica', value: 'Hybrid Indica' },
        { label: 'Sativa', value: 'Sativa' },
        { label: 'Hybrid Sativa', value: 'Hybrid Sativa' },
        { label: 'Hybrid', value: 'Hybrid' },
      ],
      defaultValue: 'Indica',
      validation: {
        isRequired: true,
      },
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
      defaultValue: 'Indoor',
      validation: {
        isRequired: true,
      },
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    price_threshold: relationship({
      ref: 'Pricing.product',
      many: true,
      ui: {
        createView: { fieldMode: 'edit' },
        inlineCreate: { fields: ['name', 'price', 'amount', 'weight', 'threshold'] },
        inlineEdit: { fields: ['name', 'price', 'amount', 'weight', 'threshold'] },
      }
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage.product',
      many: true,
      ui: {
        createView: { fieldMode: 'edit' },
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
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
    vendor: relationship({
      ref: 'Vendor.products',
      many: false,
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      const { name, slug } = resolvedData;
      if (name) {
        return {
          ...resolvedData,
          // Ensure the first letter of the title is capitalised
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
