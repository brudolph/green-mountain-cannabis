import tw, { styled } from 'twin.macro';

const ProductStyles = styled.div(() => [
  tw`relative bg-white border border-gray-300 rounded-lg flex flex-col justify-between shadow-md`,
]);

export const TitleStyles = styled.h3(() => [
  tw`text-2xl font-headers font-bold text-primary-dark`,
]);

export const ImageContainerStyles = styled.div(() => [
  tw`bg-gray-200 group-hover:opacity-70 rounded-t-lg overflow-hidden`,
]);

export const PricingStyles = styled.p(() => [
  tw`text-lg font-headers font-semibold text-primary`,
]);

export const QuickViewStyles = styled.button(() => [
  tw`flex items-center rounded-md bg-primary-light hover:bg-primary-dark px-4 py-2 font-medium font-headers tracking-wider text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus:ring-offset-2 focus-visible:ring-opacity-75 transition-colors duration-300`,
]);

export const ButtonTrayStyles = styled.div(() => [
  tw`flex justify-between items-center space-x-6`,
]);

export default ProductStyles;
