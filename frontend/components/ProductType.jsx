import { useQuery, gql } from '@apollo/client';
import tw from 'twin.macro';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import { perPage } from '../config';
import { Processing } from '../styles/Form';
import LoadingIcon from './icons/LoadingIcon';
import DisplayError from './ErrorMessage';
import Filters from './Filters';

export const ALL_PRODUCTS_FILTERED_QUERY = gql`
  query ALL_PRODUCTS_FILTERED_QUERY(
    $skip: Int = 0
    $first: Int
    $producttype: String
  ) {
    products(
      take: $first
      skip: $skip
      where: { producttype: { equals: $producttype } }
    ) {
      id
      name
      slug
      hotDeal
      inventory
      category {
        name
      }
      status
      priceThreshold {
        name
        price
        amount
      }
      photos {
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
        id
        name
        vendor_ID
      }
    }
  }
`;

function ProductType({ page }) {
  const [filteredData, setFilteredData] = useState();

  const { data, error, loading } = useQuery(ALL_PRODUCTS_FILTERED_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!loading) {
      setFilteredData(data?.products);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading)
    return (
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
    );

  if (error) return <DisplayError error={error} />;

  return (
    <>
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
      {data && (
        <Filters
          loading={loading}
          products={data.products}
          setFilteredData={setFilteredData}
        />
      )}
      <ProductGrid>
        {/* {data &&
          data?.products.map((product) => (
            <Product key={product.id} product={product} />
          ))} */}
        {filteredData &&
          filteredData?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </ProductGrid>
    </>
  );
}

ProductType.propTypes = {
  page: PropTypes.number,
};

const ProductGrid = tw.div`grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 max-w-7xl mx-auto px-5 py-6`;

export default ProductType;
