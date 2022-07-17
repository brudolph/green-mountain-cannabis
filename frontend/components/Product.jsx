import Link from 'next/link';
import React, { forwardRef } from 'react';
import { styled } from 'twin.macro';
import { PencilIcon } from '@heroicons/react/solid';
import ProductsStyles from './styles/ProductsStyles';
import Title from './styles/Title';
import DeleteProduct from './DeleteProduct';

const EditButton = forwardRef(({ onClick, href }, ref) => (
  <a href={href} onClick={onClick} ref={ref} tw="flex items-center">
    Edit <PencilIcon tw="h-5 w-5 text-accent" />
  </a>
));

export default function Product({ product }) {
  return (
    <ProductsStyles>
      <div
        className="aspect-video"
        tw="bg-gray-200 group-hover:opacity-70 rounded-t-lg overflow-hidden"
      >
        <img
          src={product?.photo?.image?.publicUrl}
          alt={product?.photo?.altText}
          tw="w-full h-full object-center object-cover sm:w-full sm:h-full"
        />
      </div>
      <div tw="flex-1 p-4 space-y-2 flex flex-col">
        <Title>
          <Link href={`/product/${product?.id}`}>{product?.name}</Link>
        </Title>
        <ul tw="">
          <li tw="text-sm text-gray-700">
            <span tw="font-semibold">Potency:</span> THC {product?.potency}%
          </li>
          <li tw="text-sm text-gray-700">
            <span tw="font-semibold">Strain:</span> {product?.strain}
          </li>
          <li tw="text-sm text-gray-700">
            <span tw="font-semibold">
              Price per {product?.price_threshold[0]?.weight}:
            </span>{' '}
            {product?.price_threshold[0]?.price}
          </li>
          <li tw="text-sm text-gray-700">
            <span tw="font-semibold">Strain:</span>{' '}
            {product?.price_threshold[0]?.amount}
          </li>
          <li tw="text-sm text-gray-700">
            <span tw="font-semibold">Weight:</span>{' '}
            {product?.price_threshold[0]?.weight}
          </li>
          <li tw="text-sm text-gray-700">
            <span tw="font-semibold">Threshold:</span>{' '}
            {product?.price_threshold[0]?.threshold}
          </li>
        </ul>
        <div tw="flex justify-between items-center">
          <div tw="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="group"
                tw="inline-flex font-headers justify-center items-center text-lg font-semibold text-primary hover:text-primary-light"
                id="menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                $8/1g
                <svg
                  tw="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-accent group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div
              tw="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
              style={{ display: 'none' }}
            >
              <div tw="py-1" role="none">
                <a
                  href="#"
                  tw="font-medium text-gray-900 block px-4 py-2 text-base"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  $16/2g
                </a>

                <a
                  href="#"
                  tw="text-gray-500 block px-4 py-2 text-base"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  $32/3g
                </a>

                <a
                  href="#"
                  tw="text-gray-500 block px-4 py-2 text-base"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-2"
                >
                  $83/13g
                </a>

                <a
                  href="#"
                  tw="text-gray-500 block px-4 py-2 text-base"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-3"
                >
                  $100/26g
                </a>

                <a
                  href="#"
                  tw="text-gray-500 block px-4 py-2 text-base"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-4"
                >
                  $200/55g
                </a>
              </div>
            </div>
          </div>
          <div>
            <button tw="w-full bg-primary-light border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                tw="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                tw="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div tw="flex justify-between border-t border-gray-200 pt-3">
          <Link
            href={{
              pathname: 'update',
              query: {
                id: product.id,
              },
            }}
            passHref
          >
            <EditButton />
          </Link>
          <DeleteProduct id={product.id} name={product.name}>
            Delete {product.name}
          </DeleteProduct>
        </div>
      </div>
    </ProductsStyles>
  );
}
