/* eslint-disable jsx-a11y/img-redundant-alt */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductStyles, {
  ImageContainerStyles,
  ButtonTrayStyles,
  PricingStyles,
  DraftTagStyles,
  ProductImageStyles,
  ProductTitleStyles,
  AttributesListStyles,
  AttributeItemStyles,
  WeightStyles,
  PricingWeightStyles,
} from '../styles/ProductStyles';
import AddToCart from './AddToCart';
import formatMoney from '../lib/formatMoney';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/lazy';
import { Input, Label } from '../styles/Form';
import formatWeight from '../lib/formatWeight';
import 'twin.macro';
import { useUser } from './User';
import { MyLink } from './MyLink';

export default function Product({ product }) {
  const [quantity, setQuantity] = useState('');
  const user = useUser();

  useEffect(() => {
    const cartItem = user?.cart?.filter(
      (item) => item.product.id === product.id
    );
    const cartQty = cartItem[0]?.quantity;
    setQuantity(cartQty || '');
  }, [user?.cart, product.id]);

  if (!user) return null;

  const handleQtyChange = (event, min, max) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setQuantity(value.toString());
  };

  const productInCart = () =>
    user.cart.some((cartItem) => cartItem.product.id === product.id);

  let productCategory = product.category.name.toLowerCase();

  if (productCategory === 'fresh-frozen') {
    productCategory = 'flower';
  }

  if (productCategory === 'trim') {
    productCategory = 'flower';
  }

  if (productCategory === 'equipment') {
    productCategory = 'machine';
  }

  return (
    <ProductStyles>
      {product.status === 'DRAFT' && (
        <DraftTagStyles>
          <p tw="font-bold text-2xl">Draft</p>
        </DraftTagStyles>
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
          {product.photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <ProductImageStyles
                key={photo.id}
                width={395}
                height={230}
                layout="fixed"
                src={photo ? photo?.image?.publicUrl : '/failed.jpg'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageContainerStyles>
      <div tw="flex-1 p-4 space-y-2 relative">
        <ProductTitleStyles>
          <MyLink href={`/product/${product.slug}/`}>{product?.name}</MyLink>
        </ProductTitleStyles>
        <PricingWeightStyles>
          <PricingStyles>
            <span tw="sr-only">Pricing</span>{' '}
            <span tw="font-bold text-primary-dark">
              {product.priceThreshold.length > 1 ? (
                <>
                  {formatMoney(
                    product.priceThreshold[product.priceThreshold.length - 1]
                      .price
                  )}{' '}
                  - {formatMoney(product?.priceThreshold[0]?.price)}
                </>
              ) : (
                <>{formatMoney(product.price)}</>
              )}
            </span>{' '}
            <span tw="text-sm">{product?.[productCategory]?.weight}</span>
          </PricingStyles>
          <WeightStyles>
            <span tw="block font-bold text-primary-dark">
              {product.inventory}{' '}
              <span tw="text-sm">
                {formatWeight(
                  product?.[productCategory]?.weight,
                  product.inventory
                )}
              </span>
            </span>
            <span tw="block text-sm">available</span>
          </WeightStyles>
        </PricingWeightStyles>
        <AttributesListStyles>
          {product?.[productCategory]?.solventUsed && (
            <AttributeItemStyles>
              <span tw="sr-only">Oil Type:</span>
              {product?.[productCategory]?.solventUsed}
            </AttributeItemStyles>
          )}
          {product?.[productCategory]?.oilType && (
            <AttributeItemStyles>
              <span tw="sr-only">Oil Type:</span>
              {product?.[productCategory]?.oilType}
            </AttributeItemStyles>
          )}
          {product?.[productCategory]?.strain && (
            <AttributeItemStyles>
              <span tw="sr-only">Strain:</span>
              {product?.[productCategory]?.strain}
            </AttributeItemStyles>
          )}
          {product?.[productCategory]?.potency && (
            <AttributeItemStyles>
              <span tw="font-bold mr-1">THC:</span>
              {product?.[productCategory]?.potency}%
            </AttributeItemStyles>
          )}
          {product?.[productCategory]?.model && (
            <AttributeItemStyles>
              <span tw="font-bold mr-1">Model:</span>
              {product?.[productCategory]?.model}
            </AttributeItemStyles>
          )}
          {product?.[productCategory]?.modelYear && (
            <AttributeItemStyles>
              <span tw="font-bold mr-1">
                <span tw="sr-only">Model</span> Year:
              </span>
              {product?.[productCategory]?.modelYear}
            </AttributeItemStyles>
          )}
        </AttributesListStyles>

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
                tw="mx-2 w-[5.625rem]"
                onInput={(e) => handleQtyChange(e, 0, product.inventory)}
                value={quantity}
                required
                placeholder={product?.[productCategory]?.weight}
              />
            </Label>
            <AddToCart
              id={product.id}
              quantity={quantity}
              productInCart={() => productInCart()}
              inventory={product.inventory}
            />
          </ButtonTrayStyles>
        )}
      </div>
    </ProductStyles>
  );
}

Product.propTypes = { product: PropTypes.object };
