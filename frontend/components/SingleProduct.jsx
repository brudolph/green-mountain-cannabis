/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/img-redundant-alt */

import PropTypes from 'prop-types';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import Head from 'next/head';
import { css, theme } from 'twin.macro';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/lazy';
import 'swiper/css/keyboard';
import 'swiper/css/zoom';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Lazy, Keyboard, Zoom, Thumbs, Navigation, EffectFade } from 'swiper';
import { useEffect, useState } from 'react';
import PleaseSignIn from './PleaseSignIn';
import DisplayError from './ErrorMessage';
import formatWeight from '../lib/formatWeight';
import formatMoney from '../lib/formatMoney';
import { Input, Label, Processing } from '../styles/Form';
import LoadingIcon from './icons/LoadingIcon';
import {
  AttributeItemStyles,
  AttributesListStyles,
  ButtonTrayStyles,
  ContainerStyles,
  PageContainerStyles,
} from '../styles/SingleProductStyles';
import { MyLink } from './MyLink';
import { useUser } from './User';
import AddToCart from './AddToCart';
import getObjPropTarget from '../lib/getObjPropTarget';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($slug: String) {
    product(where: { slug: $slug }) {
      id
      name
      slug
      price
      category {
        name
      }
      priceThreshold {
        name
        amount
        price
      }
      recreational
      medical
      hotDeal
      photos {
        id
        image {
          publicUrl
        }
        altText
      }
      description
      status
      inventory
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

const VENDOR_ITEM_QUERY = gql`
  query VENDOR_ITEM_QUERY($vendorid: ID!) {
    products(
      take: 6
      orderBy: [{ name: asc }]
      where: { vendor: { id: { equals: $vendorid } } }
    ) {
      id
      name
      slug
      category {
        name
      }
      price
      recreational
      medical
      hotDeal
      photos {
        id
        image {
          publicUrl
          publicUrlTransformed(transformation: { width: "250", quality: "80" })
        }
        altText
      }
      status
      inventory
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

function SingleProduct({ slug }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const user = useUser();

  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      slug,
    },
  });

  const [moreVendorProducts, { data: vendordata }] =
    useLazyQuery(VENDOR_ITEM_QUERY);

  async function getVendorProducts() {
    const vendorproducts = await moreVendorProducts({
      variables: {
        vendorid: vendordata.product.vendor.id,
      },
    });
    console.log(vendorproducts.data.products);
    setVendorProducts(vendorproducts.data.products);
  }
  useEffect(() => {
    if (data) {
      getVendorProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!user) return null;

  if (loading)
    return (
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
    );

  if (error) return <DisplayError error={error} />;

  const { product } = data;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleQtyChange = (event, min, max) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setQuantity(value.toString());
  };

  const productInCart = () =>
    user.cart.some((cartItem) => cartItem.product.id === product.id);

  let productCategory = product.category.name.toLowerCase();

  if (productCategory === 'fresh frozen') {
    productCategory = 'flower';
  }

  if (productCategory === 'trim') {
    productCategory = 'flower';
  }

  if (productCategory === 'equipment') {
    productCategory = 'machine';
  }

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
      <ContainerStyles hasBgPrimaryLight20>
        <PageContainerStyles>
          <div tw="bg-white rounded-md lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-start p-6 mb-6">
            {/* Image gallery */}
            <div tw="col-span-7">
              <Swiper
                modules={[Zoom, Keyboard, Lazy, Thumbs, EffectFade]}
                effect="fade"
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                spaceBetween={10}
                slidesPerView={1}
                lazy
                keyboard
                zoom
                tw="rounded-md h-[450px] border border-primary-light/40"
              >
                {product.photos.map((photo) => (
                  <SwiperSlide key={photo.id}>
                    <div className="swiper-zoom-container">
                      <img
                        src={photo?.image?.publicUrl}
                        alt={photo?.altText}
                        tw="w-full h-full object-center !object-cover cursor-zoom-in"
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
                className="swiper-thumbs"
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
                      tw="h-full max-h-[7.5rem] object-center object-cover cursor-pointer rounded-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product info */}
            <div tw="col-span-5 mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1>{product.name}</h1>
              <div tw=" border-b pb-8">
                <div tw="grid grid-cols-12 my-3 gap-8">
                  <div tw="col-span-5">
                    <h2 tw="sr-only">Product information</h2>
                    <p tw="font-bold text-2xl">
                      {formatMoney(product.price)} /{' '}
                      {formatWeight(product?.[productCategory]?.weight)}
                    </p>
                    <ul tw="mb-5">
                      {product?.priceThreshold[0]?.name && (
                        <li style={{ margin: '6px 0' }}>
                          {product.priceThreshold[0].name} /{' '}
                          {formatWeight(product?.[productCategory]?.weight)}
                        </li>
                      )}
                      {product?.priceThreshold[1]?.name && (
                        <li>
                          {product.priceThreshold[1].name} /{' '}
                          {formatWeight(product?.[productCategory]?.weight)}
                        </li>
                      )}
                    </ul>
                    <p>
                      <span tw="font-bold">Available</span>:{' '}
                      {product?.inventory}
                      {formatWeight(
                        product?.[productCategory]?.weight,
                        product?.inventory
                      )}
                    </p>
                  </div>
                  <div tw="my-6 col-span-7">
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
                      {product?.[productCategory]?.type && (
                        <AttributeItemStyles>
                          <span tw="sr-only">Oil Type:</span>
                          {product?.[productCategory]?.type}
                        </AttributeItemStyles>
                      )}
                      {product?.[productCategory]?.strain && (
                        <AttributeItemStyles>
                          <span tw="sr-only">Strain:</span>
                          {product?.[productCategory]?.strain}
                        </AttributeItemStyles>
                      )}
                      {product?.[productCategory]?.potency > 0 && (
                        <AttributeItemStyles>
                          <span tw="font-bold mr-1">THC:</span>
                          {product?.[productCategory]?.potency}%
                        </AttributeItemStyles>
                      )}
                      {product?.[productCategory]?.trimMethod > 0 && (
                        <AttributeItemStyles>
                          <span tw="font-bold mr-1">THC:</span>
                          {product?.[productCategory]?.trimMethod}%
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
                  </div>
                </div>

                <div tw="mt-6">
                  <h3 tw="sr-only">Description</h3>

                  <div
                    tw="text-base text-gray-700 space-y-6"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>

                {user.role.name !== 'NeedsApproved' && (
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
                        onInput={(e) =>
                          handleQtyChange(e, 0, product.inventory)
                        }
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

              <div tw="mt-8">
                <h2 tw="mb-5">Additional details</h2>

                <ul tw=" divide-y divide-gray-200">
                  <li tw="">
                    <span tw="font-bold">Vendor</span>: {product.vendor.id}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div tw="bg-white rounded-md p-6">
            <div tw="flex items-center justify-between space-x-4">
              <h2>More from this Vendor</h2>
              <a
                href="/"
                tw="text-sm font-medium text-indigo-600 whitespace-nowrap hover:text-indigo-500"
              >
                View all
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
            <div
              tw="grid grid-cols-1 mt-6 gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 sm:gap-y-10 lg:grid-cols-6"
              css={[]}
            >
              {vendorProducts.map((vendorproduct) => (
                <div key={vendorproduct.id} className="group" tw="relative">
                  <div tw="overflow-hidden bg-gray-100 rounded-lg w-full h-40">
                    <img
                      src={vendorproduct?.photos[0]?.image.publicUrlTransformed}
                      alt={vendorproduct?.photos[0]?.altText}
                      tw="w-full h-full object-cover object-center"
                    />
                    <div
                      tw="flex items-end p-4 opacity-0 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <div tw="w-full px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white bg-opacity-75 rounded-md backdrop-blur backdrop-filter">
                        View Product
                      </div>
                    </div>
                  </div>
                  <div tw="flex items-center justify-between mt-4 space-x-8 text-sm font-medium text-gray-900">
                    <MyLink href={`/product/${vendorproduct.slug}`}>
                      {vendorproduct?.name}
                    </MyLink>
                  </div>
                  <ul>
                    {/* <li tw="mt-1 text-sm text-gray-500">
                      {vendorproduct?.[productCategory].price}
                    </li> */}
                    <li>
                      {formatMoney(vendorproduct.price)}/
                      {getObjPropTarget(
                        vendorproduct,
                        `${productCategory}
                      .weight`
                      )}
                    </li>
                    <li tw="mt-1 text-sm text-gray-500">
                      {vendorproduct.category.name}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </PageContainerStyles>
      </ContainerStyles>
    </PleaseSignIn>
  );
}

SingleProduct.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default SingleProduct;
