/* eslint-disable */
import { KeystoneContext } from '@keystone-6/core/types';
// import stripeConfig from '../lib/stripe';

const graphql = String.raw;

interface Arguments {
  token: string
}


async function checkout(root: any, { token }: Arguments, context: KeystoneContext): Promise<any> {
  // 1. Make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!')
  }
  // 1.5 Query the current user
  const user = await context.query.User.findOne({
    where: { id: userId },
    query: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          id
          name
          price
          description
          photos {
            id
            image {
              id
              publicUrl
            }
          }
        }
      }
    `
  });

  // 2. calc the total price for their order
  const cartItems = user.cart.filter((cartItem: any) => cartItem.product);
  const amount = cartItems.reduce(function (tally: string, cartItem: any) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let todaysDate = cDate + ' ' + cTime;


  // 3. Convert the cartItems to OrderItems
  const orderItems = cartItems.map((cartItem: any) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      weight: cartItem.weight,
      // photo: { connect: { id: cartItem.product.photos[0].id } },
    };
    return orderItem;
  });


  // 5. Create the order and return it
  const order = await context.db.Order.createOne({
    data: {
      total: amount.toString(),
      items: { create: orderItems },
      orderDate: todaysDate,
      user: { connect: { id: userId } },
    },
  });

  // 6. Clean up any old cart item
  const cartItemIds = user.cart.map((cartItem: any) => cartItem.id);

  await context.query.CartItem.deleteMany({
    where: cartItemIds.map((id: string) => ({ id })),
  });
  return order;
}

export default checkout;