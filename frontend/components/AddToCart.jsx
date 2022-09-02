import PropTypes from 'prop-types';
import { useMutation, gql } from '@apollo/client';
import 'twin.macro';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { CURRENT_USER_QUERY } from './User';
import { AddToCartStyles } from './styles/AddToCartStyles';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!, $quantity: Decimal!) {
    addToCart(productId: $id, quantity: $quantity) {
      id
      quantity
    }
  }
`;

function AddToCart({ id, quantity }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id, quantity },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <AddToCartStyles
      disabled={loading || quantity === '0' || quantity === ''}
      type="button"
      onClick={addToCart}
    >
      <span tw="sr-only">Add To Cart </span>
      <ShoppingCartIcon tw="w-5 h-5 text-white" />
    </AddToCartStyles>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string,
  quantity: PropTypes.string,
};

export default AddToCart;
