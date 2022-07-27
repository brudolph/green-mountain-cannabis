import tw, { styled } from 'twin.macro';

const ProductsStyles = styled.div(({ isSale }) => [
  tw`relative bg-white border border-gray-300 rounded-lg flex flex-col justify-between shadow-md`,
]);

export const TitleStyles = styled.h3(() => [
  tw`text-2xl font-headers font-bold text-primary-dark`,
]);

export const ImageContainerStyles = styled.div(() => [
  tw`bg-gray-200 group-hover:opacity-70 rounded-t-lg overflow-hidden`,
]);

export default ProductsStyles;
