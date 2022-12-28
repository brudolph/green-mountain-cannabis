import tw, { styled } from 'twin.macro';
import ImageWithFallback from '../components/FallbackImage.tsx';

const ProductStyles = styled.div(() => [
  tw`relative flex flex-col justify-between overflow-hidden bg-white border rounded-lg shadow-md border-primary-light/30`,
]);

export const ProductTitleStyles = styled.h3(() => [
  tw`pb-2 mb-3 text-2xl font-bold border-b border-gray-200 font-headers text-primary-dark`,
]);

export const ImageContainerStyles = styled.div(() => [
  tw`relative overflow-hidden bg-gray-200 rounded-t-lg group-hover:opacity-70`,
]);

export const ProductImageStyles = tw(
  ImageWithFallback
)`object-cover object-center w-full h-full`;

export const PricingStyles = styled.p(() => [
  tw`flex flex-col text-xl font-bold text-gray-500`,
]);

export const WeightStyles = styled.p(() => [
  tw`flex flex-col text-lg font-semibold leading-tight text-right text-gray-500`,
]);

export const PricingWeightStyles = styled.div(() => [
  tw`flex items-center justify-between pb-2 border-b border-gray-200`,
]);

export const AttributesListStyles = styled.ul(() => [tw`flex pb-3 space-x-4 `]);

export const AttributeItemStyles = styled.li(({ isSmall }) => [
  tw`flex px-3 py-1 font-semibold text-gray-700 border border-solid rounded border-accent`,
  isSmall ? tw`text-sm` : tw`text-base`,
]);

export const QuickViewStyles = styled.button(() => [
  tw`flex items-center px-4 py-2 font-medium tracking-wider text-white transition-colors duration-300 rounded-md bg-primary-light hover:bg-primary-dark font-headers focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus:ring-offset-2 focus-visible:ring-opacity-75`,
]);

export const ButtonTrayStyles = styled.div(() => [
  tw`flex justify-between space-x-10`,
]);

export const DraftTagStyles = styled.div(() => [
  tw`absolute z-10 w-1/2 p-3 text-lg font-bold text-center text-white -rotate-45 bg-red-600 shadow-md -left-12 top-4`,
]);

export const HotDealTagStyles = styled.li(() => [
  tw`w-3/12 py-1 text-sm font-bold text-center rounded shadow shadow-accent-dark text-text bg-gradient-to-b from-accent-light to-accent font-headers top-4`,
]);

export const TopPickTagStyles = styled.li(() => [
  tw`w-3/12 py-1 text-sm font-bold text-center text-white rounded shadow shadow-primary-dark font-headers top-4 bg-primary-light`,
]);

export default ProductStyles;
