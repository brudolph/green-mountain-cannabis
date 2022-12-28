import tw, { styled } from 'twin.macro';

export const PageContainerStyles = styled.div(() => [
  tw`px-4 py-12 mx-auto sm:py-16 sm:px-6 max-w-7xl lg:px-8`,
]);

export const ContainerStyles = styled.div(({ hasBgPrimaryLight20 }) => [
  tw`px-4 py-8 sm:px-6`,
  hasBgPrimaryLight20 && tw`bg-primary-light/20`,
]);

export const AttributesListStyles = styled.ul(() => [tw`flex pb-3 space-x-4 `]);

export const AttributeItemStyles = styled.li(({ isSmall }) => [
  tw`flex px-3 py-1 font-semibold text-gray-700 border border-solid rounded border-accent`,
  isSmall ? tw`text-sm` : tw`text-base`,
]);

export const ButtonTrayStyles = styled.div(() => [
  tw`flex justify-between space-x-10`,
]);
