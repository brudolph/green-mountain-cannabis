import { config } from '@keystone-6/core';
import { withAuth, session } from './auth';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { Vendor } from './schemas/Vendor';
import { Pricing } from './schemas/Pricing';
import { CartItem } from './schemas/CartItem';
import { extendGraphqlSchema } from './mutations';

const databaseURL = process.env.DATABASE_URL || 'file:./keystone.db';

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL!],
        credentials: true,
      },
    },
    db: {
      provider: 'postgresql',
      url: databaseURL,
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists: ({
      User,
      Product,
      ProductImage,
      Vendor,
      Pricing,
      CartItem
    }),
    extendGraphqlSchema,
    session,
  })
);
