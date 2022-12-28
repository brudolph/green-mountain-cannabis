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
import { Oil } from './schemas/Oil';
import { Concentrate } from './schemas/Concentrate';
import { PreRoll } from './schemas/PreRoll';
import { Machine } from './schemas/Equipment';
import { FlowerTrimFreshFrozen } from './schemas/FlowerTrimFreshFrozen';
import { Category } from './schemas/Category';
import { extendGraphqlSchema } from './mutations';
import { addCompatibilityForQueries } from './compat';
import { insertSeedData } from './seed-data';

const databaseURL = process.env.DATABASE_URL || 'file:./keystone.db';

export default withAuth(
  config({
    server: {
      // cors: {
      //   origin: process.env.NODE_ENV === 'production' ? [process.env.FRONTEND_URL!] : undefined,
      //   credentials: true,
      // },
      cors: { origin: true, credentials: true, methods: process.env.CORS_METHODS, },
    },
    db: {
      provider: 'postgresql',
      url: databaseURL,
      // enableLogging: false,
      useMigrations: true,
      async onConnect(context) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(context);
        }
      },
    },
    lists: ({
      User,
      Product,
      Oil,
      FlowerTrimFreshFrozen,
      Concentrate,
      PreRoll,
      Machine,
      ProductImage,
      Category,
      Vendor,
      Pricing,
      CartItem,
      OrderItem,
      Order,
      Role,
    }),
    extendGraphqlSchema,
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) => !!session,
    },
    session,
    graphql: {
      playground: process.env.NODE_ENV === 'production' ? false : true
    }
  })
);
