import tw, { styled } from 'twin.macro';
import ImageWithFallback from '../components/FallbackImage.tsx';

export const CheckoutFormStyles = styled.form(() => [
  tw`p-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16`,
]);

export const CartItemStyles = styled.li(() => [tw`p-6`]);

export const ProductImage = tw(
  ImageWithFallback
)`object-cover object-center rounded-md border border-gray-200`;

export const ProductTitle = tw.h3`text-2xl font-headers font-bold text-primary-dark hover:text-primary border-b border-gray-200 pb-3 mb-4 transition-colors duration-300`;
