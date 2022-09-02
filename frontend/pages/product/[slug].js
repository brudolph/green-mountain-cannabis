import PropTypes from 'prop-types';
import PleaseSignIn from '../../components/PleaseSignIn';
import SingleProduct from '../../components/SingleProduct';

function SingleProductPage({ query }) {
  return (
    <PleaseSignIn>
      <SingleProduct slug={query.slug} />
    </PleaseSignIn>
  );
}

SingleProductPage.propTypes = {
  query: PropTypes.shape({
    slug: PropTypes.string,
  }),
};

export default SingleProductPage;
