import tw, { styled } from 'twin.macro';
import { XCircleIcon } from '@heroicons/react/outline';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import formatMoney from '../lib/formatMoney';
import { useUser } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li(() => [
  tw`py-4 border-b border-solid border-gray-200 grid grid-cols-[auto 1fr auto] gap-4`,
]);

function CartItem({ cartItem }) {
  const { product } = cartItem;
  if (!product) return null;
  return (
    <CartItemStyles>
      <img width="100" src={product.photo.image.publicUrl} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product?.price_threshold[0]?.price * cartItem.quantity)}
          <br />
          <em>
            {cartItem.quantity} &times;{' '}
            {formatMoney(product?.price_threshold[1]?.price)} per{' '}
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
        {/* <Checkout /> */}
      </footer>
    </CartStyles>
  );
}
