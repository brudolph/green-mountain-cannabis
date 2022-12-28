import tw, { styled } from 'twin.macro';

export const ProductGridStyles = tw.div`grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 max-w-7xl mx-auto px-5 py-6`;

export const ContainerStyles = styled.div(({ hasBgPrimaryLight20 }) => [
  tw`px-4 py-6 sm:px-6`,
  hasBgPrimaryLight20 && tw`bg-primary-light/20`,
]);
