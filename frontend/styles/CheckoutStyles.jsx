import tw, { styled } from 'twin.macro';
import ImageWithFallback from '../components/FallbackImage.tsx';

export const PageContainerStyles = styled.div(() => [
  tw`px-4 py-12 mx-auto sm:py-16 sm:px-6 max-w-7xl lg:px-8`,
]);

export const ContainerStyles = styled.div(({ hasBgPrimaryLight20 }) => [
  tw`px-4 py-8 sm:px-6`,
  hasBgPrimaryLight20 && tw`bg-primary-light/20`,
]);

export const CheckoutFormStyles = styled.form(() => [
  tw`px-6 pb-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16`,
]);

export const CartItemStyles = styled.li(() => [tw`p-6`]);

export const ProductImageStyles = tw(
  ImageWithFallback
)`object-cover object-center rounded-md border border-gray-200`;

export const ProductTitleStyles = tw.h3`text-2xl font-headers font-bold text-primary-dark hover:text-primary border-b border-gray-200 pb-3 mb-4 transition-colors duration-300`;
