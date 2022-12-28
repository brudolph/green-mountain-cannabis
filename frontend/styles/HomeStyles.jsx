import tw, { css, styled } from 'twin.macro';

export const PageContainerStyles = styled.div(tw`relative mt-8 sm:pb-24`);

export const ContainerStyles = styled.div(({ hasBgPrimaryLight20 }) => [
  tw`px-4 py-16 sm:px-6 `,
  hasBgPrimaryLight20 && tw`bg-primary-light/20`,
]);
