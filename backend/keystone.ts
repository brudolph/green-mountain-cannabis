import { config } from '@keystone-6/core';
import { withAuth, session } from './auth';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { Vendor } from './schemas/Vendor';
import { Pricing } from './schemas/Pricing';
import { CartItem } from './schemas/CartItem';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
import { Role } from './schemas/Role';
import { extendGraphqlSchema } from './mutations';
import { addCompatibilityForQueries } from './compat';

// const databaseURL = process.env.DATABASE_URL || 'file:./keystone.db';

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
      url: process.env.DATABASE_URL_POOL,
      enableLogging: true,
      useMigrations: true,
    },
    lists: ({
      User,
      Product,
      ProductImage,
      Vendor,
      Pricing,
      CartItem,
      OrderItem,
      Order,
      Role
    }),
    extendGraphqlSchema: (schema) =>
      addCompatibilityForQueries(extendGraphqlSchema(schema)),
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    session,
    playground: process.env.NODE_ENV !== 'production'
  })
);
