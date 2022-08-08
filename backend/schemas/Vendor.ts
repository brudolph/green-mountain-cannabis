import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const Vendor = list({
  // access
  // ui
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    contact: text({ isIndexed: 'unique' }),
    vendor_ID: text(),
    notes: text(),
    products: relationship({ ref: 'Product.vendor', many: true, }),
  },
});
