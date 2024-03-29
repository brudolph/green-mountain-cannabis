import { KeystoneContext } from '@keystone-6/core/types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId, quantity }: { productId: string, quantity: string },
  context: KeystoneContext
): Promise<any> {
  console.log('Qty', quantity);

  // 1. Query the current user see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current users cart
  const allCartItems = await context.query.CartItem.findMany({
    where: { user: { id: { equals: sesh.itemId } }, product: { id: { equals: productId } } },
    query: 'id quantity',
  });

  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    // See if the current item is in their cart
    // if it is, update quantity
    return context.db.CartItem.updateOne({
      where: { id: existingCartItem.id },
      data: { quantity: quantity },
    });
  }
  // if it isnt, create a new cart item!
  return context.db.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      quantity: quantity,
      user: { connect: { id: sesh.itemId } },
    },
  });
}

export default addToCart;