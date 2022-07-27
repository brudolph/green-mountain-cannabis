import tw, { styled } from 'twin.macro';
import { useId, useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Router, useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useCart } from '../context/cartState';
import { CURRENT_USER_QUERY, useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import RemoveFromCart from './RemoveFromCart';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      total
      items {
        id
        name
      }
    }
  }
`;

// const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || 'avc');
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
        src={product?.photo?.image?.publicUrl}
        alt={product.name}
      />
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

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  // const stripe = useStripe();
  // const elements = useElements();
  const router = useRouter();
  const checkoutid = useId();
  const { closeCart } = useCart();
  const user = useUser();
  if (!user) return null;

  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    // Stop the form from submitting and turn the loader one
    e.preventDefault();
    setLoading(true);

    // Start the page transition
    nProgress.start();

    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return; // stops the checkout from happening
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation!
    const order = await checkout({
      variables: {
        token: checkoutid,
      },
    });

    // 6. Change the page to view the order
    router.push({
      pathname: `/order/[id]`,
      query: {
        id: order.data.checkout.id,
      },
    });

    // 7. turn the loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      <header>
        <div>{user.name}'s Cart</div>
      </header>
      <ul>
        {user.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <button>Check Out Now</button>
    </CheckoutFormStyles>
  );
}

function Checkout() {
  return (
    <div>
      <CheckoutForm />
    </div>
  );
}

export { Checkout };
