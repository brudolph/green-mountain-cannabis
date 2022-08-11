import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { TrashIcon } from '@heroicons/react/solid';
import 'twin.macro';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict({ id: cache.identify(payload.data.deleteProduct.id) });
  console.log(payload.data.deleteProduct.id);
}

function DeleteProduct({ id }) {
  const { inputs } = useForm({
    name: '',
  });
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete ${inputs.name}?`)) {
          // go ahead and delete it
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
      tw="flex items-center"
    >
      Delete <TrashIcon tw="h-5 w-5 text-accent" />
    </button>
  );
}

DeleteProduct.propTypes = {
  id: PropTypes.number,
};

export default DeleteProduct;
