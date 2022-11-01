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
import { useUser } from './User';

export const ALL_PRODUCTS_FILTERED_QUERY = gql`
  query ALL_PRODUCTS_FILTERED_QUERY(
    $skip: Int = 0
    $first: Int
    $category: String
    $recreational: Boolean
    $medical: Boolean
  ) {
    products(
      take: $first
      skip: $skip
      orderBy: [{ name: asc }]
      where: {
        OR: [
          { recreational: { equals: $recreational } }
          { medical: { equals: $medical } }
        ]
        category: { slug: { equals: $category } }
      }
    ) {
      id
      name
      slug
      inventory
      price
      priceThreshold {
        name
        price
        amount
      }
      recreational
      medical
      hotDeal
      category {
        slug
        name
      }
      photos {
        id
        image {
          publicUrl
        }
        altText
      }
      description
      status
      vendor {
        id
        name
        vendor_ID
      }
      flower {
        label
        weight
        potency
        strain
        trimMethod
        environment
      }
      oil {
        label
        weight
        potency
        cbd
        oilType
        solventUsed
      }
      concentrate {
        label
        weight
        potency
        strain
        type
      }
      preRoll {
        label
        size
        potency
        strain
        type
        tube
      }
      machine {
        label
        model
        modelYear
        condition
      }
    }
  }
`;

function ProductCategory({ page, category, productType }) {
  const [filteredData, setFilteredData] = useState();

  const recreational = productType === 'recreational';
  const medical = productType === 'medical';

  const user = useUser();

  const { data, error, loading } = useQuery(ALL_PRODUCTS_FILTERED_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
      category,
      recreational,
      medical,
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

  // console.log(user);

  return (
    <>
      <DisplayError error={error} />
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

ProductCategory.propTypes = {
  page: PropTypes.number,
  category: PropTypes.string,
  productType: PropTypes.string,
};

const ProductGrid = tw.div`grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 max-w-7xl mx-auto px-5 py-6`;

export default ProductCategory;
