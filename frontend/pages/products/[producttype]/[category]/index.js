import { useRouter } from 'next/dist/client/router';
import Pagination from '../../../../components/Pagination';
import PleaseSignIn from '../../../../components/PleaseSignIn';
import ProductCategory from '../../../../components/ProductCategory';

export default function ProductCategoryPage() {
  const { query } = useRouter();

  const page = parseInt(query.page);

  return (
    <PleaseSignIn>
      <ProductCategory
        category={query.category}
        productType={query.producttype}
        page={page || 1}
      />
      <Pagination page={page || 1} />
    </PleaseSignIn>
  );
}
