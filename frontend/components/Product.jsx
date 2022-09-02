/* eslint-disable jsx-a11y/img-redundant-alt */
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ProductStyles, {
  TitleStyles,
  ImageContainerStyles,
  ButtonTrayStyles,
  PricingStyles,
} from './styles/ProductStyles';
import AddToCart from './AddToCart';
import formatMoney from '../lib/formatMoney';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/lazy';
import { Input, Label } from './styles/Form';
import formatWeight from '../lib/formatWeight';
import 'twin.macro';
import { useUser } from './User';

export default function Product({ product }) {
  const [quantity, setQuantity] = useState('');
  const user = useUser();
  if (!user) return null;

  const handleQtyChange = (event, min, max) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setQuantity(value.toString());
  };

  return (
    <ProductStyles>
      {product.status === 'DRAFT' && (
        <div tw="absolute inset-x-0 top-4 left-[63%] w-1/2 p-3 rotate-45 bg-accent text-center shadow-md z-10">
          <p tw="font-bold text-2xl">Draft</p>
        </div>
      )}
      <ImageContainerStyles>
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          grabCursor
          lazy
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
      <div tw="flex-1 p-4 space-y-2 relative">
        <div tw=" flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
          <TitleStyles>
            <Link href={`/product/${product.slug}/`}>{product?.name}</Link>
          </TitleStyles>
          <PricingStyles>
            <span tw="sr-only">Pricing</span>{' '}
            {product.price_threshold.length > 1 ? (
              <>
                {formatMoney(
                  product.price_threshold[product.price_threshold.length - 1]
                    .price
                )}{' '}
                - {formatMoney(product.price_threshold[0].price)}
              </>
            ) : (
              <>{formatMoney(product.price_threshold[0].price)}</>
            )}
            <span tw="italic ml-1">{formatWeight(product.weight)}</span>
          </PricingStyles>
        </div>
        <ul tw="flex space-x-4 border-b border-gray-200 pb-3">
          <li tw="flex text-base text-gray-700 font-semibold border border-solid border-accent px-3 py-1 rounded">
            <span tw="sr-only">Class:</span> {product?.strain}
          </li>
          <li tw="flex text-base text-gray-700 font-semibold border border-solid border-accent px-3 py-1 rounded">
            <span tw="sr-only">Potency:</span>
            {product?.potency}%
          </li>
        </ul>
        <div tw="flex justify-between items-center text-sm border-b pb-3 border-gray-200">
          <p tw="text-lg font-headers font-semibold text-gray-600 inline-block">
            <span tw=" inline-block">
              Available:{' '}
              <span>
                {product.inventory}
                {formatWeight(product.weight)}s
              </span>
            </span>
          </p>
        </div>
        {user.__typename !== 'NeedsApproved' && (
          <ButtonTrayStyles>
            <Label tw="mb-0">
              Qty:{' '}
              <Input
                type="number"
                name="quantity"
                min="0.0"
                max={product.inventory}
                step="0.01"
                hasBorder
                tw="mx-2 w-[4.375rem]"
                onInput={(e) => handleQtyChange(e, 0, product.inventory)}
                value={quantity}
                required
              />
              <span>{formatWeight(product.weight)}s</span>
            </Label>
            <AddToCart
              id={product.id}
              quantity={quantity}
              inventory={product.inventory}
            />
          </ButtonTrayStyles>
        )}
      </div>
    </ProductStyles>
  );
}

Product.propTypes = { product: PropTypes.object };
