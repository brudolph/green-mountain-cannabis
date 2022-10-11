import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";

export const VariantOption = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    variant: relationship({
      ref: 'Variant.variantOption',
      many: true,
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'description'],
    },
  },
});