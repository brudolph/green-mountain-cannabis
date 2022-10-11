import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const ProductCategory = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    // product: relationship({
    //   ref: 'Product2.category',
    //   many: true,
    // })
  },
});
