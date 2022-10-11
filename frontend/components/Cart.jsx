import PropTypes from 'prop-types';
import { Fragment } from 'react';
import tw, { styled } from 'twin.macro';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';
import {
  CartItemStyles,
  CheckoutButton,
  CartButtonStyles,
  CartPanelStyles,
  CartStyles,
  ProductImage,
} from '../styles/CartStyles';
import CartCount from './CartCount';
import { useUser } from './User';
import RemoveFromCart from './RemoveFromCart';
import { MyLink } from './MyLink';

function CartItem({ cartItem }) {
  const { product } = cartItem;
  if (!product) return null;
  return (
    <CartItemStyles key={product.id}>
      <ProductImage
        width={64}
        height={64}
        layout="fixed"
        src={
          product?.photos[0]
            ? product?.photos[0]?.image?.publicUrl
            : '/failed.jpg'
        }
      />
      <div tw="ml-4 flex-auto">
        <h3 tw="font-medium text-gray-700 text-sm">
          <MyLink href={`/product/${product.slug}/`}>{product.name}</MyLink>
        </h3>
        <p>Qty: {cartItem.quantity}</p>
        <div tw="py-2">
          <RemoveFromCart id={cartItem.id} />
        </div>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const user = useUser();
  if (!user) return null;
  return (
    <CartStyles>
      <CartButtonStyles className="group">
        <span tw="sr-only">Open Cart</span>
        <ShoppingCartIcon tw="w-6 h-6 text-accent" />
        <CartCount count={user.cart.length} />
      </CartButtonStyles>
      <StyledTransition
        as={Fragment}
        enter="enter"
        enterFrom="enterFrom"
        enterTo="enterTo"
        leave="leave"
        leaveFrom="leaveFrom"
        leaveTo="leaveTo"
      >
        <CartPanelStyles>
          <h2 tw="sr-only">Shopping Cart</h2>
          <form tw="mx-auto max-w-2xl px-4">
            <ul tw="divide-y divide-gray-200 mb-4 max-h-[400px] overflow-y-auto">
              {user.cart.map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
            <CheckoutButton type="submit" href="/checkout">
              Checkout
            </CheckoutButton>
          </form>
        </CartPanelStyles>
      </StyledTransition>
    </CartStyles>
  );
}

const StyledTransition = styled(Transition)`
  &.enter {
    ${tw`transition duration-200 ease-out`}
  }
  &.enterFrom {
    ${tw`opacity-0`}
  }
  &.enterTo {
    ${tw`opacity-100`}
  }
  &.leave {
    ${tw`transition duration-100 ease-in`}
  }
  &.leaveFrom {
    ${tw`opacity-100`}
  }
  &.leaveTo {
    ${tw`opacity-0`}
  }
`;

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.string,
    product: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
      photos: PropTypes.any,
      priceThreshold: PropTypes.any,
      weight: PropTypes.string,
    }),
    quantity: PropTypes.string,
  }),
};
