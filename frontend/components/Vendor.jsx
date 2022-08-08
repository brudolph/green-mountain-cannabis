/* eslint-disable jsx-a11y/img-redundant-alt */
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Lazy, Keyboard, Zoom } from 'swiper';
import { useRouter } from 'next/router';
import tw, { css } from 'twin.macro';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import 'swiper/css/keyboard';
import 'swiper/css/zoom';
import { Disclosure, RadioGroup, Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/solid';
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import PleaseSignIn from './PleaseSignIn';
import DisplayError from './ErrorMessage';

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
      environment
    }
  }
`;

export default function Vendor({ id }) {
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
      <div tw="grid grid-cols-1 lg:grid-cols-12 lg:gap-10">
        <div tw="col-span-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <ul>
            <li>{product?.price_threshold[0]?.threshold}</li>
            <li>{product?.strain}</li>
            <li>{product?.potency}</li>
            <li>{product?.environment}</li>
          </ul>
          <p>Available: {product?.inventory}</p>
        </div>
      </div>
      <div tw="bg-white">
        <div tw="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div tw="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div>
              <Swiper
                modules={[Pagination, Zoom, Keyboard, Lazy]}
                spaceBetween={10}
                slidesPerView={1}
                grabCursor
                lazy
                autoHeight
                keyboard
                zoom
                pagination={{ clickable: true }}
                tw="rounded-md"
              >
                {product.photo.map((photo) => (
                  <SwiperSlide key={photo.id}>
                    <div className="swiper-zoom-container">
                      <img
                        src={photo?.image?.publicUrl}
                        alt={photo?.altText}
                        tw="w-full h-full object-center object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product info */}
            <div tw="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 tw="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div tw="mt-3">
                <h2 tw="sr-only">Product information</h2>
                <p tw="text-3xl text-gray-900">{product.price}</p>
              </div>

              {/* Reviews */}
              <div tw="mt-3">
                <h3 tw="sr-only">Reviews</h3>
                <div tw="flex items-center">
                  <div tw="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        css={[
                          product.rating > rating
                            ? tw`text-indigo-500`
                            : tw`text-gray-300`,
                          tw`h-5 w-5 flex-shrink-0`,
                        ]}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p tw="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div tw="mt-6">
                <h3 tw="sr-only">Description</h3>

                <div
                  tw="text-base text-gray-700 space-y-6"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <form tw="mt-6">
                {/* Colors */}
                <div>
                  <h3 tw="text-sm text-gray-600">Color</h3>

                  <RadioGroup value={product.name} tw="mt-2">
                    <RadioGroup.Label tw="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <span tw="flex items-center space-x-3">
                      <RadioGroup.Option value="black">
                        <RadioGroup.Label as="span" tw="sr-only">
                          Red
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          css={tw`h-8 w-8 border border-black border-opacity-10 rounded-full`}
                        />
                      </RadioGroup.Option>
                    </span>
                  </RadioGroup>
                </div>

                <div tw="mt-10 flex sm:flex-1">
                  <button
                    type="submit"
                    tw="max-w-xs flex-1 bg-primary border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full transition-colors duration-300"
                  >
                    Add to cart
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" tw="mt-12">
                <h2 id="details-heading" tw="sr-only">
                  Additional details
                </h2>

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
                          <ul role="list" />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PleaseSignIn>
  );
}
