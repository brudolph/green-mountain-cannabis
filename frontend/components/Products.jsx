import { useQuery, gql, useLazyQuery } from '@apollo/client';
import tw from 'twin.macro';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import Product from './Product';
import { perPage } from '../config';
import { Input, Label, Processing } from './styles/Form';
import LoadingIcon from './icons/LoadingIcon';
import DisplayError from './ErrorMessage';
import Filters from './Filters';
import Checkbox from './forms/Checkbox';

const ALL_PRODUCTS_FILTERED_QUERY = gql`
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
      hotdeal
      inventory
      producttype
      productcategory
      weight
      potency
      strain
      price_threshold {
        name
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

const initialFilters = [
  { strainH: 'Hybrid' },
  { strainHS: 'Hybrid Sativa' },
  { strainS: 'Sativa' },
  { strainHI: 'Hybrid Indica' },
  { strainI: 'Indica' },
  { environmentI: 'Indoor' },
  { environmentO: 'Outdoor' },
  { environmentG: 'Greenhouse' },
];
// function useFilters() {

//   const updateFilter = (name, value) => {
//     _updateFilter({
//       ...filters,
//       [name]: value,
//     });
//   };

//   return {
//     models: { filters },
//     operations: { updateFilter },
//   };
// }

export default function Products({ page, producttype }) {
  const [filteredData, setFilteredData] = useState();
  const [filters, setFilters] = useState([
    { Hybrid: false },
    { 'Hybrid Sativa': false },
    { Sativa: false },
    { 'Hybrid Indica': false },
    { Indica: false },
    { Indoor: false },
    { Outdoor: false },
    { Greenhouse: false },
  ]);

  const { data, error, loading, refetch } = useQuery(
    ALL_PRODUCTS_FILTERED_QUERY,
    {
      variables: {
        skip: page * perPage - perPage,
        first: perPage,
        producttype,
        initialFilters,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  const updateFilters = (index) => {
    setFilters(
      filters.map((filter, currentIndex) =>
        currentIndex === index
          ? { ...filter, checked: !filter.checked }
          : filter
      )
    );
  };

  useEffect(() => {
    if (!loading) {
      setFilteredData(data);
    }
  }, [loading]);

  // const filteredProducts = useMemo(() => {
  //   const hasFilter = Object.values(filters).includes(true);

  //   const matchesStrain = (product) => {
  //     if (hasFilter) {
  //       return product.strains.some(
  //         (strain) => filters[strain] === true
  //       );
  //     }
  //     return true;
  //   };

  //   return data.filter(matchesStrain);
  // }, [data, filters]);

  if (loading)
    return (
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
    );

  return (
    <>
      <DisplayError error={error} />
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
      <div tw="bg-white">
        <div tw="max-w-7xl mx-auto flex justify-between px-5">
          <p>Sort</p>
          <div tw="flex justify-start space-x-4">
            <Popover tw="relative">
              <Popover.Button tw="text-sm flex">
                Strains{' '}
                <ChevronDownIcon
                  tw="ml-2 h-4 w-4  text-accent"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Popover.Panel tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
                {filters.map((filter, index) => (
                  <Checkbox
                    key={filter.name}
                    isChecked={filter.checked}
                    checkHandler={() => updateFilters(index)}
                    label={filter.value}
                    index={index}
                  />
                ))}
                {/* <Label>
                  Hybrid
                  <Input
                    type="checkbox"
                    id="strainH"
                    name="strainH"
                    defaultValue="Hybrid"
                    onChange={(e) =>
                      operations.updateFilter(
                        'strainH',
                        e.target.checked ? e.target.value : ''
                      )
                    }
                    isChecked={filters.strainH}
                    tw="w-2 h-2"
                  />
                </Label>
                <Label>
                  Hybrid Sativa
                  <Input
                    type="checkbox"
                    id="strainHS"
                    name="strainHS"
                    defaultValue="Hybrid Sativa"
                    onChange={(e) =>
                      operations.updateFilter(
                        'strainHS',
                        e.target.checked ? e.target.value : ''
                      )
                    }
                    isChecked={models.filters.strainHS}
                    tw="w-2 h-2"
                  />
                </Label>
                <Label>
                  Sativa
                  <Input
                    type="checkbox"
                    id="strainS"
                    name="strainS"
                    defaultValue="Sativa"
                    onChange={(e) =>
                      operations.updateFilter(
                        'strainS',
                        e.target.checked ? e.target.value : ''
                      )
                    }
                    isChecked={models.filters.strainS}
                    tw="w-2 h-2"
                  />
                </Label> */}
              </Popover.Panel>
            </Popover>
          </div>
        </div>
      </div>
      <ProductGrid>
        {/* {data &&
          data?.products.map((product) => (
            <Product key={product.id} product={product} />
          ))} */}
        {data &&
          data?.products?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </ProductGrid>
    </>
  );
}

const ProductGrid = tw.div`grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 max-w-7xl mx-auto px-5 py-6`;
