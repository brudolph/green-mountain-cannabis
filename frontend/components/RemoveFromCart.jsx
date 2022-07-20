import { useMutation } from '@apollo/client';
import { TrashIcon } from '@heroicons/react/outline';
import gql from 'graphql-tag';
import tw, { styled, css } from 'twin.macro';

const DeleteButton = styled.button(() => [
  css`
    font-size: 3rem;
    background: none;
    border: 0;
    &:hover {
      color: var(--red);
      cursor: pointer;
    }
  `,
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

export default function RemoveFromCart({ id }) {
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
      <TrashIcon tw="w-6 h-6 text-accent-dark" />
    </DeleteButton>
  );
}
