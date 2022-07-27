import gql from 'graphql-tag';
import { useQuery } from '@apollo/client/react';
import tw from 'twin.macro';
import Product from './Product';
import { perPage } from '../config';
import { Processing } from './styles/Form';
import LoadingIcon from './icons/LoadingIcon';
import DisplayError from './ErrorMessage';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    products(take: $first, skip: $skip) {
      id
      name
      inventory
      weight
      potency
      strain
      price_threshold {
        price
        amount
        weight
        threshold
      }
      environment
      description
      photo {
        id
        image {
          publicUrl
        }
        altText
        product {
          name
        }
      }
      vendor {
        name
        vendor_ID
      }
    }
  }
`;

const ProductGrid = tw.div`grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <DisplayError error={error} />
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Processing
      </Processing>
      <ProductGrid>
        {data.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductGrid>
    </>
  );
}
