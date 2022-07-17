import { decimal, integer, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const Product = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
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
      label: 'Product type'
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
    potency: integer({
      defaultValue: 0,
      validation: {
        min: 1,
        max: 35,
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
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    price_threshold: relationship({
      ref: 'Pricing.product',
      many: true,
      ui: {
        createView: { fieldMode: 'edit' },
      }
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
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
});
