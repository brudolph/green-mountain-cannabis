/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types';
import tw, { styled } from 'twin.macro';
import { useId, useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { CURRENT_USER_QUERY, useUser } from './User';
import RemoveFromCart from './RemoveFromCart';
import PleaseSignIn from './PleaseSignIn';
import {
  CartItemStyles,
  CheckoutFormStyles,
  ProductImage,
  ProductTitle,
} from '../styles/CheckoutStyles';
import { Input, Label, Processing } from '../styles/Form';
import LoadingIcon from './icons/LoadingIcon';
import DisplayError from './ErrorMessage';
import formatWeight from '../lib/formatWeight';
import { MyLink } from './MyLink';

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

function CartItem({ cartItem }) {
  const { product, quantity } = cartItem;
  if (!product) return null;
  return (
    <CartItemStyles key={product.id}>
      <ProductTitle>
        <MyLink href={`/product/${product.slug}/`}>{product.name}</MyLink>
      </ProductTitle>
      <div tw="flex gap-x-5">
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
      </div>

      <div tw="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div tw="relative grid grid-cols-3 gap-5">
          <div tw="col-span-2">
            <Label tw="mb-0">
              Qty:{' '}
              <Input
                type="number"
                name="quantity"
                min="0.0"
                max={product.inventory}
                step="0.01"
                hasBorder
                tw="mx-2 w-[5.625rem]"
                // onInput={(e) => handleQtyChange(e, 0, product.inventory)}
                value={quantity}
                required
              />
              <span>{formatWeight(product.weight)}s</span>
            </Label>

            <p tw="mt-1 text-sm font-medium text-gray-900">{quantity}</p>
          </div>

          <div tw="col-span-1 mt-4 sm:mt-0">
            <RemoveFromCart id={cartItem.id} />
          </div>
        </div>
      </div>
    </CartItemStyles>
  );
}

function getValue(object, path) {
  return path.reduce((tmp, key) => tmp[key], object);
}

function groupCartItems(cartItems) {
  const path = ['product', 'vendor', 'id'];
  return cartItems.reduce((groups, item) => {
    const product = getValue(item, path);
    const group = groups[product] || (groups[product] = []);
    group.push(item);
    return groups;
  }, {});
}

function CheckoutForm() {
  const [error, setError] = useState();
  const [setLoading] = useState(false);
  const router = useRouter();
  const checkoutid = useId();
  const user = useUser();
  const [checkout, { loading, error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  if (loading)
    return (
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
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

  const groupByVendor = groupCartItems(user.cart);

  return (
    <PleaseSignIn>
      <DisplayError error={error} />
      <DisplayError error={graphQLError && graphQLError.message} />
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
      <div tw="mx-auto max-w-2xl py-12 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 tw="text-center">Checkout</h1>
        <CheckoutFormStyles onSubmit={handleSubmit}>
          <div aria-labelledby="cart-heading" tw="lg:col-span-8">
            <h2 id="cart-heading" tw="sr-only">
              Items in your shopping cart
            </h2>
            {Object.keys(groupByVendor).map((key) => (
              <>
                <h3>{`Vendor: ${key}`}</h3>
                <ul tw="space-y-6">
                  {groupByVendor[key].map((item, index) => (
                    <CartItem key={index} cartItem={item} />
                  ))}
                </ul>
                {groupByVendor[key].reduce(
                  (previousValue, currentValue) =>
                    previousValue + parseFloat(currentValue.quantity),
                  0
                )}
              </>
            ))}
          </div>

          {/* Order summary */}
          <div
            aria-labelledby="summary-heading"
            tw="mt-16 rounded-lg bg-primary-light/40 px-4 py-6 sm:p-6 lg:col-span-4 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" tw="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <div tw="mt-6">
              <button
                type="submit"
                tw="w-full rounded-md border border-transparent bg-primary py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Place Order
              </button>
            </div>
          </div>
        </CheckoutFormStyles>
      </div>
    </PleaseSignIn>
  );
}

function Checkout() {
  return (
    <div>
      <CheckoutForm />
    </div>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.string,
    product: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
      strain: PropTypes.string,
      potency: PropTypes.string,
      environment: PropTypes.string,
      photo: PropTypes.array,
      priceThreshold: PropTypes.array,
      weight: PropTypes.string,
      status: PropTypes.string,
      inventory: PropTypes.string,
    }),
    quantity: PropTypes.string,
  }),
};

export { Checkout };
