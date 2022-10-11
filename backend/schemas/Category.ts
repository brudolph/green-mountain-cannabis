import { decimal, relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const Category = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
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
