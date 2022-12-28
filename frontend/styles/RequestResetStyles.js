import tw, { styled } from 'twin.macro';

export const PageContainerStyles = styled.div(() => [
  tw`px-4 py-12 mx-auto sm:py-16 sm:px-6 max-w-7xl lg:px-8`,
]);

export const ContainerStyles = styled.div(({ hasBgPrimaryLight20 }) => [
  tw`px-4 pb-8 sm:px-6`,
  hasBgPrimaryLight20 && tw`bg-primary-light/20`,
]);
