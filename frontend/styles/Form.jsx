import tw, { styled } from 'twin.macro';

export const PageContainerStyles = styled.div(() => [
  tw`px-4 py-12 mx-auto sm:py-16 sm:px-6 max-w-7xl lg:px-8`,
]);

export const ContainerStyles = styled.div(({ hasBgPrimaryLight20 }) => [
  tw`px-4 py-8 sm:px-6`,
  hasBgPrimaryLight20 && tw`bg-primary-light/20`,
]);

export const Form = styled.form(({ hasBorder }) => [
  tw`max-w-lg mx-auto`,
  hasBorder && tw`border-purple-500`,
]);

export const FormButton = styled.button(() => [
  tw`flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-300 border border-transparent rounded shadow-sm bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark`,
]);

export const Label = styled.label(({ isStacked }) => [
  tw`flex mb-6 text-sm font-semibold`,
  isStacked ? tw`flex-col` : tw`items-center`,
]);

export const Input = styled.input(({ type }) => [
  tw`px-2 py-2 font-bold leading-tight border-gray-300 rounded shadow-sm grow focus:ring-accent focus:border-accent-dark text-primary-dark`,
  type !== 'checkbox' ? tw`self-start w-full` : null,
]);

export const Select = styled.select(() => [
  tw`block w-full py-2 pl-3 pr-10 mt-1 mt-2 mb-4 text-base border-gray-300 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm`,
]);

export const Processing = styled.div(({ loading }) => [
  tw`flex justify-center p-3 mb-4 font-medium text-white bg-primary-light`,
  loading === 'true' ? tw`flex` : tw`hidden`,
]);

export const SuccessStyles = styled.div(() => [
  tw`p-8 my-8 bg-white border-l-8 border-primary-light`,
]);
