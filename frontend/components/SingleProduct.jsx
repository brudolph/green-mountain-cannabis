/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { css, theme } from 'twin.macro';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Lazy, Keyboard, Zoom, Thumbs, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/keyboard';
import 'swiper/css/zoom';

import { Disclosure } from '@headlessui/react';
import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import PleaseSignIn from './PleaseSignIn';
import DisplayError from './ErrorMessage';
import formatWeight from '../lib/formatWeight';
import { Processing } from '../styles/Form';
import LoadingIcon from './icons/LoadingIcon';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($slug: String) {
    product(where: { slug: $slug }) {
      name
      slug
      price
      priceThreshold {
        name
        amount
        price
      }
      photos {
        image {
          publicUrl
        }
      }
      inventory
    }
  }
`;

function SingleProduct({ slug }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      slug,
    },
  });

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (loading)
    return (
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
    );
  if (error) return <DisplayError error={error} />;
  const { product } = data;

  return (
    <PleaseSignIn>
      <DisplayError error={error} />
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
      <Head>
        <title>{product.name} | Green Mountain Cannabis</title>
      </Head>
      <div tw="bg-primary/20">
        <div tw="max-w-2xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div tw="bg-white rounded-md lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-start p-6">
            {/* Image gallery */}
            <div tw="col-span-7">
              <Swiper
                modules={[Zoom, Keyboard, Lazy, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={10}
                slidesPerView={1}
                lazy
                keyboard
                zoom
                tw="rounded-md h-[480px] border border-primary-light/40"
              >
                {product.photos.map((photo) => (
                  <SwiperSlide key={photo.id}>
                    <div className="swiper-zoom-container">
                      <img
                        src={photo?.image?.publicUrl}
                        alt={photo?.altText}
                        tw="w-full h-full object-center !object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                modules={[Navigation, Thumbs]}
                className="mySwiper"
                tw="mt-4"
              >
                {product.photos.map((photo) => (
                  <SwiperSlide key={photo.id}>
                    <img
                      src={photo?.image?.publicUrl}
                      alt={photo?.altText}
                      css={css`
                        aspect-ratio: ${theme`aspectRatio.thumbs`};
                      `}
                      tw="h-full object-center object-cover cursor-pointer rounded-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product info */}
            <div tw="col-span-5 mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
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
                    {product?.potency}% THC
                  </li>
                  <li tw="flex text-base text-gray-700 font-semibold border border-solid border-accent px-3 py-1 rounded">
                    Grown {product?.environment}
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
  slug: PropTypes.string,
};

export default SingleProduct;
