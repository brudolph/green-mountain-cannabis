import PropTypes from 'prop-types';
import PleaseSignIn from '../components/PleaseSignIn';
import UpdateProduct from '../components/UpdateProduct';

function UpdatePage({ query }) {
  return (
    <PleaseSignIn>
      <UpdateProduct id={query.id} />
    </PleaseSignIn>
  );
}

UpdatePage.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default UpdatePage;
