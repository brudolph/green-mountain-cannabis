import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { permissions } from '../access';
import { permissionFields } from "./fields";

export const Role = list({
  access: {
    operation: {
      create: permissions.canManageRoles,
    },
    filter: {
      query: permissions.canManageRoles,
      update: permissions.canManageRoles,
      delete: permissions.canManageRoles,
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
    isHidden: (args) => !permissions.canManageRoles(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
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