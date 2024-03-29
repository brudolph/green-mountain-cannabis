/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types';
import 'twin.macro';
import { useEffect, useState } from 'react';
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
  ContainerStyles,
  PageContainerStyles,
  ProductImageStyles,
  ProductTitleStyles,
} from '../styles/CheckoutStyles';
import { Input, Label, Processing } from '../styles/Form';
import LoadingIcon from './icons/LoadingIcon';
import DisplayError from './ErrorMessage';
import formatWeight from '../lib/formatWeight';
import formatMoney from '../lib/formatMoney';
import { MyLink } from './MyLink';
import AddToCart from './AddToCart';
import randomId from '../lib/randomId';

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

function getValue(object, path) {
  return path.reduce((tmp, key) => tmp[key], object);
}

function groupCartItems(cartItems, path) {
  return cartItems.reduce((groups, item) => {
    const product = getValue(item, path);
    const group = groups[product] || (groups[product] = []);
    group.push(item);
    return groups;
  }, {});
}

function CalculatePrice({ list }) {
  // const categoryGroup = list.reduce((groups, item) => {
  //   const product = getValue(item, ['product', 'category', 'name']);
  //   const group = groups[product] || (groups[product] = []);
  //   group.push(item);
  //   return groups;
  // }, {});
  // // console.log(list[0].quantity);
  // // console.log(categoryGroup.Flower[0]);

  // const categoryPriceTotal = Object.keys(categoryGroup).map((key) => {
  //   const categoryQtyTotal = () =>
  //     categoryGroup[key].reduce(
  //       (previousQuantity, currentQuantity) =>
  //         previousQuantity + parseFloat(currentQuantity.quantity),
  //       0
  //     );
  //   const calculateDiscount = (categoryQtyTotal) => {
  //     const highestAmount = Math.max.apply(
  //       null,
  //       categoryGroup[key][0].product.priceThreshold.map((q) => q.amount)
  //     );
  //     const shit = categoryGroup[key][0].product.priceThreshold.find(
  //       (item) => item.amount <= highestAmount
  //     );
  //   };

  //   const calculatePrice = (price, discount) => {};

  //   return calculateDiscount();
  // });
  // const finalFinalPrice = categoryPriceTotal;

  // return formatMoney(finalFinalPrice);

  const total = list.reduce(
    (previousQuantity, currentQuantity) =>
      previousQuantity +
      parseFloat(currentQuantity.quantity) * currentQuantity.product.price,
    0
  );

  return formatMoney(total);
}

const current = new Date();
const cDate = `${current.getFullYear()}-${
  current.getMonth() + 1
}-${current.getDate()}`;
const cTime = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
const todaysDate = `${cDate} ${cTime}`;

function CartItem({ cartItem }) {
  const [cartQuantity, setCartQuantity] = useState('');
  const { product, quantity } = cartItem;

  console.log(todaysDate);

  const productInCart = () => true;

  const handleQtyChange = (event, min, max) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setCartQuantity(value.toString());
  };

  let productCategory = product.category.name.toLowerCase();

  if (productCategory === 'fresh-frozen') {
    productCategory = 'flower';
  }

  if (productCategory === 'trim') {
    productCategory = 'flower';
  }

  useEffect(() => {
    setCartQuantity(quantity);
  }, [quantity]);

  if (!product) return null;
  return (
    <CartItemStyles key={product.id}>
      <ProductTitleStyles>
        <MyLink href={`/product/${product.slug}/`}>{product.name}</MyLink>
      </ProductTitleStyles>
      <div tw="flex gap-x-5">
        <ProductImageStyles
          width={64}
          height={64}
          layout="fixed"
          src={
            product?.photos[0]
              ? product?.photos[0]?.image?.publicUrl
              : '/fallback.jpg'
          }
        />
        <div>
          <span style={{ fontWeight: '600' }}>Base Price:</span> $
          {product.price} / {formatWeight(product?.[productCategory]?.weight)}
          <ul>
            {product?.priceThreshold[0]?.name && (
              <li style={{ margin: '6px 0' }}>
                {product.priceThreshold[0].name} /{' '}
                {formatWeight(product?.[productCategory]?.weight)}
              </li>
            )}
            {product?.priceThreshold[1]?.name && (
              <li>
                {product.priceThreshold[1].name} /{' '}
                {formatWeight(product?.[productCategory]?.weight)}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div tw="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div tw="relative grid grid-cols-3 gap-5">
          <div tw="col-span-2 flex items-center">
            <Label tw="mb-0">
              Amount in Cart:{' '}
              <Input
                type="number"
                name="quantity"
                min="0.0"
                max={product.inventory}
                step="0.01"
                hasBorder
                tw="mx-2 w-[5.625rem]"
                onInput={(e) => handleQtyChange(e, 0, product.inventory)}
                value={cartQuantity}
                required
              />
            </Label>
            <AddToCart
              id={product.id}
              quantity={cartQuantity}
              productInCart={productInCart}
              inventory={product.inventory}
            />
          </div>

          <div tw="col-span-1 mt-4 sm:mt-0">
            <RemoveFromCart id={cartItem.id} />
          </div>
        </div>
      </div>
    </CartItemStyles>
  );
}

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const checkoutid = randomId(16);
  const user = useUser();
  const [checkout, { error: graphQLError }] = useMutation(
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

  const groupByVend = groupCartItems(user.cart, ['product', 'vendor', 'id']);

  return (
    <PleaseSignIn>
      <DisplayError error={error} />
      <DisplayError error={graphQLError && graphQLError.message} />
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
      <ContainerStyles hasBgPrimaryLight20>
        <PageContainerStyles>
          <h1 tw="text-center">Checkout</h1>
          <CheckoutFormStyles onSubmit={handleSubmit}>
            <div aria-labelledby="cart-heading" tw="lg:col-span-8 ">
              <h2 id="cart-heading" tw="sr-only">
                Items in your shopping cart
              </h2>

              {Object.keys(groupByVend).map((key) => (
                <div
                  key={`vendor-${key}`}
                  tw="bg-white border rounded-md shadow-md border-primary-light/30 px-5 py-6 mb-4"
                >
                  <h3
                    tw="text-lg text-right text-gray-600 font-medium"
                    key={`title-${key}`}
                  >{`Vendor: ${key}`}</h3>
                  <ul tw="space-y-6">
                    {groupByVend[key].map((item) => (
                      <CartItem key={item.id} cartItem={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Order summary */}
            <div
              aria-labelledby="summary-heading"
              tw="sticky top-5 mt-16 rounded-lg bg-primary-light/40 px-4 py-6 sm:p-6 lg:col-span-4 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" tw="text-lg font-medium text-gray-900">
                Order summary
              </h2>
              {/* {Object.keys(groupByVend).map((key) => (
                <div
                  key={`vendor-${key}`}
                  tw="bg-white border rounded-md shadow-md border-primary-light/30 px-5 py-6 mb-4"
                >
                  <h3 tw="text-sm mb-3" key={`title-${key}`}>
                    <span tw="sr-only">Vendor:</span> {`${key}`}
                  </h3>
                  <CalculatePrice list={groupByVend[key]} />
                </div>
              ))} */}
              <div tw="bg-white border rounded-md shadow-md border-primary-light/30 px-5 py-6 mb-4">
                <p>
                  <span tw="font-bold">Subtotal:</span>{' '}
                  <CalculatePrice list={user.cart} />
                </p>
              </div>
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
        </PageContainerStyles>
      </ContainerStyles>
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
      category: PropTypes.shape({
        name: PropTypes.shape({
          toLowerCase: PropTypes.func,
        }),
      }),
      price: PropTypes.string,
      slug: PropTypes.string,
      strain: PropTypes.string,
      potency: PropTypes.string,
      environment: PropTypes.string,
      photos: PropTypes.array,
      priceThreshold: PropTypes.array,
      weight: PropTypes.string,
      status: PropTypes.string,
      inventory: PropTypes.string,
    }),
    quantity: PropTypes.string,
  }),
};

export { Checkout };
