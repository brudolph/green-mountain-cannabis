import PropTypes from 'prop-types';
import { useMutation, gql } from '@apollo/client';
import 'twin.macro';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { CURRENT_USER_QUERY } from './User';
import { AddToCartStyles } from '../styles/AddToCartStyles';
import LoadingIcon from './icons/LoadingIcon';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!, $quantity: Decimal!) {
    addToCart(productId: $id, quantity: $quantity) {
      id
      quantity
    }
  }
`;

function AddToCart({ id, quantity, productInCart }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id, quantity },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const inCart = productInCart();

  return (
    <AddToCartStyles
      disabled={loading || quantity === '0' || quantity === ''}
      type="button"
      onClick={addToCart}
    >
      {loading ? (
        <LoadingIcon tw="animate-spin" />
      ) : (
        <>
          <span tw="text-sm mr-2">{inCart ? 'Update' : 'Add'}</span>
          <ShoppingCartIcon tw="w-5 h-5 text-white" />
        </>
      )}
    </AddToCartStyles>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string,
  productInCart: PropTypes.func,
  quantity: PropTypes.string,
};

export default AddToCart;
