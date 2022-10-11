import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import tw, { styled } from 'twin.macro';

const DeleteButton = styled.button(() => [
  tw`font-medium text-accent-dark hover:text-accent`,
]);

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(where: { id: $id }) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    optimisticResponse: {
      deleteCartItem: {
        __typename: 'CartItem',
        id,
      },
    },
  });
  return (
    <DeleteButton
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove This Item from Cart"
    >
      Remove
    </DeleteButton>
  );
}

RemoveFromCart.propTypes = {
  id: PropTypes.string,
};

export default RemoveFromCart;
