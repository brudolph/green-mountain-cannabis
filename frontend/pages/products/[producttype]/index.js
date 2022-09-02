import { useRouter } from 'next/dist/client/router';
import Cart from '../../../components/Cart';
import Pagination from '../../../components/Pagination';
import PleaseSignIn from '../../../components/PleaseSignIn';
import ProductType from '../../../components/ProductType';

export default function ProductsTypePage() {
  const { query } = useRouter();

  const page = parseInt(query.page);

  return (
    <PleaseSignIn>
      <ProductType producttype={query.producttype} page={page || 1} />
      <Cart />
      <Pagination page={page || 1} />
    </PleaseSignIn>
  );
}
