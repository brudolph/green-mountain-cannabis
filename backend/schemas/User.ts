import { text, password } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const User = list({
  // access
  // ui
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    password: password(),
  },
});
