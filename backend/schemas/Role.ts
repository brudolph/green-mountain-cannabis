import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { permissions } from '../access';
import { permissionFields } from "./fields";
import { allOperations, allowAll } from '@keystone-6/core/access';


export const Role = list({
  // access: {
  //   operation: {
  //     create: permissions.canManageRoles,
  //     query: permissions.canManageRoles,
  //     update: permissions.canManageRoles,
  //     delete: permissions.canManageRoles,
  //   },
  //   filter: {
  //     query: permissions.canSeeOwnRole,
  //     update: permissions.canManageRoles,
  //     delete: permissions.canManageRoles,
  //   }
  // },
  access: allowAll,
  ui: {
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
    isHidden: (args) => !permissions.canManageRoles(args),
  },
  fields: {
    name: text({ isIndexed: 'unique', validation: { isRequired: true } }),
    ...permissionFields,
    assignedTo: relationship({
      ref: 'User.role',
      many: true,
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
  },
});