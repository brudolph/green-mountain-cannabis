import { text, password, relationship } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { allOperations, allowAll } from '@keystone-6/core/access';
import { permissions, rules } from '../access';


export const User = list({
  // access: {
  //   operation: {
  //     ...allOperations(allowAll),
  //     create: () => true,
  //     // only people with the permission can delete themselves!
  //     // You can't delete yourself
  //     delete: permissions.canManageUsers,
  //   },
  //   filter: {
  //     query: rules.canManageUsers,
  //     update: rules.canManageUsers,
  //   },
  // },
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    phone: text(),
    jobTitle: text(),
    license: text(),
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
      many: false,
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
      hooks: {
        async resolveInput({ context, operation, resolvedData }) {
          if (operation === 'create' && !resolvedData.role) {
            const role = await context.prisma.Role.findMany({
              where: { name: { equals: 'NeedsApproved' } },
            });
            const id = role?.[0]?.id;
            if (id) resolvedData['role'] = { connect: { id } };
          }
          return resolvedData.role;
        },
      }
    })
  },
});
