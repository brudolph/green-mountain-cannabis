import { checkbox, decimal, relationship, select, virtual, text } from '@keystone-6/core/fields';
import { list, group } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { permissions, rules, isSignedIn } from '../access';


export const Product = list({
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
    name: text({ validation: { isRequired: true } }),
    slug: text({ isIndexed: 'unique', label: 'Pretty URL (Leave blank. This will be automatically filled once saved)' }),
    inventory: decimal({
      defaultValue: '1.0',
      precision: 18,
      scale: 2,
      label: 'Inventory'
    }),
    price: decimal({
      defaultValue: '0',
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
      label: 'Recreational Product?',
      ui: {
        itemView: { fieldPosition: "sidebar" }
      },
    }),
    medical: checkbox({
      label: 'Medical Product?',
      ui: {
        itemView: { fieldPosition: "sidebar" }
      },
    }),
    hotDeal: checkbox({
      label: 'Hot Deal?',
      ui: {
        itemView: { fieldPosition: "sidebar" }
      },
    }),
    topPick: checkbox({
      label: 'Top Pick?',
      ui: {
        itemView: { fieldPosition: "sidebar" }
      },
    }),
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
    // modifiedDate: timestamp({ label: 'Product Modified Date' }),
    ...group({
      label: "Product Types",
      description: "Create only one of the following product types for each product.",
      fields: {
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
      }
    }),
    vendor: relationship({
      ref: 'Vendor.product',
      many: false,
      ui: {
        itemView: { fieldPosition: "sidebar" }
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
        createView: { fieldMode: 'hidden' },
        itemView: { fieldPosition: "sidebar" }
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'hotDeal', 'category', 'status', 'inventory'],
    },
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args),
    isHidden: (args) => !permissions.canManageProducts(args),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      const { name, slug, createdDate } = resolvedData;
      if (name && !slug) {
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
    },
    afterOperation: ({ resolvedData, item }) => {
      const { price } = resolvedData;

      if (price) {
        return {
          ...resolvedData,
          price: Math.round(100 * parseFloat(typeof price === 'string' ? price.replace(/[$,]/g, '') : price))
        }
      }
      return resolvedData;
    }
  },
});
