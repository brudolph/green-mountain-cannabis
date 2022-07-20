import { useMutation } from '@apollo/client';
import 'twin.macro';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button
      disabled={loading}
      type="button"
      onClick={addToCart}
      tw="w-full bg-primary-light border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
    >
      <span tw="sr-only">Add To Cart</span>
      <ShoppingCartIcon tw="w-5 h-5 text-white" />
    </button>
  );
}
