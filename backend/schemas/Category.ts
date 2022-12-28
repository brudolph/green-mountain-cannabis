import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { rules, isSignedIn } from '../access';

export const Category = list({
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
    slug: text({
      isIndexed: 'unique',
      label: 'Pretty URL (created automatically on save)',
    }),
    product: relationship({
      ref: 'Product.category',
      many: true,
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
