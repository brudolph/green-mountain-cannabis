import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Lazy } from 'swiper';
import tw, { styled } from 'twin.macro';
import PropTypes from 'prop-types';
import { XCircleIcon } from '@heroicons/react/outline';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import { VariablesInAllowedPositionRule } from 'graphql';
import gql from 'graphql-tag';
import { useLazyQuery, useQuery } from '@apollo/client';
import { PricingStyles } from './styles/ProductStyles';
import formatMoney from '../lib/formatMoney';
import formatWeight from '../lib/formatWeight';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($id: ID) {
    products(where: { vendor: { id: { equals: $id } } }) {
      id
      name
      inventory
      potency
      strain
      environment
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
    }
  }
`;

export default function QuickView({
  content,
  dialogOpen = false,
  closeDialog,
}) {
  let id = '';

  const [getVendor, { data, error, loading }] = useLazyQuery(
    ALL_PRODUCTS_QUERY,
    {
      variables: {
        id,
      },
    }
  );

  useEffect(() => {
    if (dialogOpen) {
      id = content.vendor.id;
      console.log(id);
      getVendor({ variables: id });
    }
  }, [dialogOpen]);

  return (
    <Transition appear show={dialogOpen} as={Fragment}>
      <Dialog as="div" tw="relative z-10" onClose={closeDialog}>
        <StyledTransitionChildOuter
          as={Fragment}
          enter="enter"
          enterFrom="enterFrom"
          enterTo="enterTo"
          leave="leave"
          leaveFrom="leaveFrom"
          leaveTo="leaveTo"
        >
          <div tw="fixed inset-0  bg-primary bg-opacity-75" />
        </StyledTransitionChildOuter>

        <div tw="fixed inset-0 overflow-y-auto">
          <div tw="flex min-h-full items-center justify-center p-4 text-center">
            <StyledTransitionChildInner
              as={Fragment}
              enter="enter"
              enterFrom="enterFrom"
              enterTo="enterTo"
              leave="leave"
              leaveFrom="leaveFrom"
              leaveTo="leaveTo"
            >
              <Dialog.Panel tw="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <button
                  type="button"
                  tw="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={closeDialog}
                >
                  <span tw="sr-only">Close</span>
                  <XCircleIcon tw="h-6 w-6" aria-hidden="true" />
                </button>
                <div tw="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                  <div tw="sm:col-span-6 lg:col-span-6">
                    <div tw=" rounded-lg bg-gray-100 overflow-hidden">
                      <Swiper
                        modules={[Pagination]}
                        spaceBetween={10}
                        slidesPerView={1}
                        grabCursor
                        pagination={{ clickable: true }}
                        tw="h-56"
                      >
                        {content?.photo?.map((photo) => (
                          <SwiperSlide key={photo.id}>
                            <img
                              src={photo?.image?.publicUrl}
                              alt={photo?.altText}
                              tw="w-full h-full object-center object-cover"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                  <div tw="sm:col-span-6 lg:col-span-6">
                    <h2 tw="text-3xl font-headers font-bold text-primary-dark">
                      {content.name}
                    </h2>

                    <section aria-labelledby="information-heading" tw="mt-3">
                      <h3 id="information-heading" tw="sr-only">
                        Product information
                      </h3>

                      <ul tw="flex space-x-4 border-b border-gray-200 pb-3">
                        <li tw="flex text-base text-gray-700 font-semibold border border-solid border-accent px-3 py-1 rounded">
                          <span tw="sr-only">Class:</span> {content?.strain}
                        </li>
                        <li tw="flex text-base text-gray-700 font-semibold border border-solid border-accent px-3 py-1 rounded">
                          <span tw="sr-only">Potency:</span>
                          {content?.potency}%
                        </li>
                        <li tw="flex text-base text-gray-700 font-semibold border border-solid border-accent px-3 py-1 rounded">
                          <span tw="sr-only">Environment:</span>
                          {content?.environment}
                        </li>
                      </ul>
                      <p tw="text-lg font-headers font-semibold text-gray-600">
                        <span tw=" inline-block">
                          Available:{' '}
                          <span>
                            {content.inventory}
                            {formatWeight(content.weight)}s
                          </span>
                        </span>
                      </p>
                      {content?.vendor?.id && (
                        <p tw="text-lg font-headers font-semibold text-gray-600">
                          <span tw=" inline-block">
                            Vendor: <span>{content?.vendor?.id}</span>
                          </span>
                        </p>
                      )}

                      {/* <PricingStyles>
                        <span tw="sr-only">Pricing</span>{' '}
                        {content?.price_threshold?.length > 1 ? (
                          <>
                            {formatMoney(
                              content.price_threshold[
                                content.price_threshold.length - 1
                              ].price
                            )}{' '}
                            - {formatMoney(content?.price_threshold?.price)}
                          </>
                        ) : (
                          <>{formatMoney(content?.price_threshold?.price)}</>
                        )}
                        <span tw="italic ml-1">
                          {formatWeight(content.weight)}
                        </span>
                      </PricingStyles> */}
                    </section>
                    <div>More from this Vendor: {data}</div>
                  </div>
                </div>
              </Dialog.Panel>
            </StyledTransitionChildInner>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

const StyledTransitionChildOuter = styled(Transition.Child)`
  &.enter {
    ${tw`ease-out duration-300`}
  }
  &.enterFrom {
    ${tw`opacity-0`}
  }
  &.enterTo {
    ${tw`opacity-100`}
  }
  &.leave {
    ${tw`ease-in duration-200`}
  }
  &.leaveFrom {
    ${tw`opacity-100`}
  }
  &.leaveTo {
    ${tw`opacity-0`}
  }
`;
const StyledTransitionChildInner = styled(Transition.Child)`
  &.enter {
    ${tw`ease-out duration-300`}
  }
  &.enterFrom {
    ${tw`opacity-0 scale-95`}
  }
  &.enterTo {
    ${tw`opacity-100 scale-100`}
  }
  &.leave {
    ${tw`ease-in duration-200`}
  }
  &.leaveFrom {
    ${tw`opacity-100 scale-100`}
  }
  &.leaveTo {
    ${tw`opacity-0 scale-95`}
  }
`;
