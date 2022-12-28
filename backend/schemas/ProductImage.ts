import 'dotenv/config';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { isSignedIn, permissions } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'fake',
  apiKey: process.env.CLOUDINARY_KEY || 'fake',
  apiSecret: process.env.CLOUDINARY_SECRET || 'fake',
  folder: 'greenmountain',
};

export const ProductImage = list({
  access: {
    operation: {
      create: permissions.canManageProducts,
      query: () => true,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
    },
    filter: { query: () => true, },
  },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    product: relationship({ ref: 'Product.photos' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText'],
    },
  },
});
