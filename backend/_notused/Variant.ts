import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const Variant = list({
  fields: {
    variantOption: relationship({
      ref: 'VariantOption.variant',
    }),
    product: relationship({
      ref: 'Product2.variants',
    }),
    name: text({ validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
  },
});
