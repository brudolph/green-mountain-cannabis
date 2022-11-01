import { text, password, relationship } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { permissions, rules } from '../access';

export const User = list({
  access: {
    operation: {
      create: () => true,
    },
    filter: {
      query: rules.canManageUsers,
      update: rules.canManageUsers,
      // only people with the permission can delete themselves!
      // You can't delete yourself
      delete: permissions.canManageUsers,
    }
  },
  ui: {
    // hide the backend UI from regular users
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    password: password({
      validation: {
        length: { min: 10, max: 1000 },
        isRequired: true,
        rejectCommon: true,
      },
    }),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    orders: relationship({ ref: 'Order.user', many: true }),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    })
  },
  hooks: {
    resolveInput: async ({ resolvedData }) => {
      const { role } = resolvedData;
      return {
        ...resolvedData,
        set: { role: "cl93neazl15598uwudqxph2a6m" },
      }
    }
  },
});
