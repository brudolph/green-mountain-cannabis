import { useRouter } from 'next/dist/client/router';
import 'twin.macro';
import Cart from '../../components/Cart';
import Pagination from '../../components/Pagination';
import PleaseSignIn from '../../components/PleaseSignIn';
import Products from '../../components/Products';

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);

  return (
    <PleaseSignIn>
      <Products producttype="Medical" page={page || 1} />
      <Cart />
      <Pagination page={page || 1} />
    </PleaseSignIn>
  );
}
