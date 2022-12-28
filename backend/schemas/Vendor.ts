import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { permissions, rules, isSignedIn } from '../access';


export const Vendor = list({
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
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    email: text(),
    contact_name: text(),
    phone: text(),
    mobile: text(),
    vendor_ID: text(),
    notes: text({ ui: { displayMode: 'textarea' } }),
    product: relationship({ ref: 'Product.vendor', many: true })
  },
  ui: {
    listView: {
      initialColumns: ['name', 'phone', 'mobile', 'contact_name'],
    },
  },
});
