import PropTypes from 'prop-types';
import tw, { styled } from 'twin.macro';
import { XCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import CartStyles from './styles/CartStyles';
import formatMoney from '../lib/formatMoney';
import { useUser } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../context/cartState';
import RemoveFromCart from './RemoveFromCart';
import formatWeight from '../lib/formatWeight';

const CartItemStyles = styled.li(() => [
  tw`py-4 border-b border-solid border-gray-200 grid grid-cols-[auto 1fr auto] gap-4`,
]);

function CartItem({ cartItem }) {
  const { product } = cartItem;
  if (!product) return null;
  return (
    <CartItemStyles>
      <img
        width="100"
        src={product?.photo[0]?.image?.publicUrl}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          <em>
            {cartItem.quantity}{' '}
            {formatWeight(product.weight, cartItem.quantity)}
            <br />
            {formatMoney(
              product.price_threshold[product.price_threshold.length - 1].price
            )}{' '}
            - {formatMoney(product.price_threshold[0].price)} per{' '}
            {product.weight}
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
}

export default function Cart() {
  const user = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!user) return null;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <div>{user.name}'s Cart</div>
        <button type="button" onClick={closeCart}>
          <span tw="sr-only">Close Cart</span>
          <XCircleIcon tw="w-8 h-8 text-accent" />
        </button>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
        <Link href="/checkout">Checkout</Link>
      </footer>
    </CartStyles>
  );
}
CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.string,
    product: PropTypes.shape({
      name: PropTypes.string,
      photo: PropTypes.any,
      price_threshold: PropTypes.any,
      weight: PropTypes.string,
    }),
    quantity: PropTypes.string,
  }),
};
