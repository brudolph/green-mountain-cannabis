import PropTypes from 'prop-types';
import { useRouter } from 'next/dist/client/router';
import Cart from '../../../../components/Cart';
import Pagination from '../../../../components/Pagination';
import PleaseSignIn from '../../../../components/PleaseSignIn';
import Products from '../../../../components/ProductType';

export default function ProductCategoryPage({ category }) {
  const { query } = useRouter();

  const page = parseInt(query.page);

  return (
    <PleaseSignIn>
      <Products category={category} page={page || 1} />
      <Cart />
      <Pagination page={page || 1} />
    </PleaseSignIn>
  );
}

ProductCategoryPage.propTypes = {
  category: PropTypes.string,
};
