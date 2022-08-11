/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Lazy, Keyboard, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import 'swiper/css/keyboard';
import 'swiper/css/zoom';
import { Disclosure } from '@headlessui/react';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import PleaseSignIn from './PleaseSignIn';
import DisplayError from './ErrorMessage';
import formatWeight from '../lib/formatWeight';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    product(where: { id: $id }) {
      name
      strain
      price_threshold {
        weight
        threshold
      }
      photo {
        image {
          publicUrl
        }
      }
      description
      potency
      inventory
      weight
      environment
    }
  }
`;

function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { product } = data;
  return (
    <PleaseSignIn>
      <DisplayError error={error} />
      <Head>
        <title>`Green Mountain Cannabis | ${product.name}`</title>
      </Head>
      <div tw="bg-primary/20">
        <div tw="max-w-2xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div tw="bg-white rounded-md lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start p-6">
            {/* Image gallery */}
            <div>
              <Swiper
                modules={[Pagination, Zoom, Keyboard, Lazy]}
                spaceBetween={10}
                slidesPerView={1}
                grabCursor
                lazy
                keyboard
                zoom
                pagination={{ clickable: true }}
                tw="rounded-md h-[31.25rem] border border-primary-light/40"
              >
                {product.photo.map((photo) => (
                  <SwiperSlide key={photo.id}>
                    <div className="swiper-zoom-container">
                      <img
                        src={photo?.image?.publicUrl}
                        alt={photo?.altText}
                        tw="h-full object-center object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product info */}
            <div tw="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 tw="text-3xl font-extrabold tracking-tight text-primary">
                {product.name}
              </h1>

              <div tw="mt-3">
                <h2 tw="sr-only">Product information</h2>
                <ul tw="flex space-x-4 border-b border-gray-200 pb-3">
                  <li tw="flex text-base text-gray-700 font-semibold border border-solid border-accent px-3 py-1 rounded">
                    <span tw="sr-only">Class:</span> {product?.strain}
                  </li>
                  <li tw="flex text-base text-gray-700 font-semibold border border-solid border-accent px-3 py-1 rounded">
                    <span tw="sr-only">Potency:</span>
                    {product?.potency}%
                  </li>
                  <li tw="flex text-base text-gray-700 font-semibold border border-solid border-accent px-3 py-1 rounded">
                    {product?.environment}
                  </li>
                </ul>
                <p>
                  Available: {product?.inventory}
                  {formatWeight(product.weight)}s
                </p>
                <p tw="text-3xl text-gray-900">{product.price}</p>
              </div>

              <div tw="mt-6">
                <h3 tw="sr-only">Description</h3>

                <div
                  tw="text-base text-gray-700 space-y-6"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <section aria-labelledby="details-heading" tw="mt-12">
                <h2 id="details-heading">Additional details</h2>

                <div tw="border-t divide-y divide-gray-200">
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button
                            className="group"
                            tw=" relative w-full py-6 flex justify-between items-center text-left"
                          >
                            <span
                              css={[
                                open ? 'text-indigo-600' : 'text-gray-900',
                                'text-sm font-medium',
                              ]}
                            >
                              Name
                            </span>
                            <span tw="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  tw="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  tw="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel as="div" tw="pb-6">
                          <ul />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </section>
            </div>
          </div>
          <div tw="bg-white" />
        </div>
      </div>
    </PleaseSignIn>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string,
};

export default SingleProduct;
