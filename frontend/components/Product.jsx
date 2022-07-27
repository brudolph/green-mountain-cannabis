/* eslint-disable jsx-a11y/img-redundant-alt */
import Link from 'next/link';
import { styled } from 'twin.macro';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ProductsStyles, {
  TitleStyles,
  ImageContainerStyles,
} from './styles/ProductsStyles';
import AddToCart from './AddToCart';
import formatMoney from '../lib/formatMoney';
import 'swiper/css';
import 'swiper/css/pagination';
import { Input, Label } from './styles/Form';
import formatWeight from '../lib/formatWeight';
import { useDialog } from '../context/dialogState';

export default function Product({ product }) {
  const [quantity, setQuantity] = useState('0');
  const { openDialog, closeDialog } = useDialog();

  const urlify = function (a) {
    return a
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  return (
    <ProductsStyles>
      <ImageContainerStyles>
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          grabCursor
          pagination={{ clickable: true }}
          tw="h-56"
        >
          {product.photo.map((photo) => (
            <SwiperSlide key={photo.id}>
              <img
                key={photo.id}
                src={photo?.image?.publicUrl}
                alt={photo?.altText}
                tw="w-full h-full object-center object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageContainerStyles>
      <div tw="flex-1 p-4 space-y-2">
        <div tw="flex justify-between items-center border-b border-gray-200 pb-1 mb-3">
          <TitleStyles>
            <Link
              href={{
                pathname: '/product/[name]',
                query: { id: product.id },
              }}
              as={`/product/${urlify(product.name)}/`}
            >
              {product?.name}
            </Link>
          </TitleStyles>
          <p tw="font-semibold">
            <span tw="sr-only">Pricing</span>{' '}
            {product.price_threshold.length > 1 ? (
              <>
                <span>
                  {formatMoney(
                    product.price_threshold[product.price_threshold.length - 1]
                      .price
                  )}
                </span>{' '}
                - <span>{formatMoney(product.price_threshold[0].price)}</span>
              </>
            ) : (
              <span>{formatMoney(product.price_threshold[0].price)}</span>
            )}
            <span tw="italic ml-1">{formatWeight(product.weight)}</span>
          </p>
        </div>
        <ul tw="space-y-2 border-b border-gray-200 pb-2 mb-3">
          <li tw="flex text-base text-gray-700 font-semibold">
            <span tw="text-gray-500 mr-2">Potency:</span>
            {product?.potency}%
          </li>
          <li tw="flex text-base text-gray-700  font-semibold">
            <span tw="text-gray-500 mr-2">Class:</span> {product?.strain}
          </li>
        </ul>
        <div tw="flex justify-between items-center">
          <div>
            <button
              type="button"
              onClick={openDialog}
              tw="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Quick Product View
            </button>
          </div>
          <div tw="flex">
            <Label>
              Qty:{' '}
              <Input
                type="number"
                name="quantity"
                min="0.0"
                max={product.inventory}
                step="0.01"
                hasBorder
                tw="mx-2 w-20 h-10"
                onInput={(e) => setQuantity(e.target.value)}
              />
            </Label>
            <AddToCart
              id={product.id}
              quantity={quantity}
              // inventory={product.inventory}
            />
          </div>
        </div>
      </div>
    </ProductsStyles>
  );
}
