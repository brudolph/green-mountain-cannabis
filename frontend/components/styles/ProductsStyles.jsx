import tw, { styled } from 'twin.macro';

const ProductsStyles = styled.div(({ isSale }) => [
  tw`relative bg-white border border-gray-200 rounded-lg flex flex-col`,
]);

export default ProductsStyles;
