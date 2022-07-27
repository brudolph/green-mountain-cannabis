import tw, { styled, css } from 'twin.macro';

export const Form = styled.form(({ hasBorder }) => [
  tw`max-w-lg mx-auto`,
  hasBorder && tw`border-purple-500`,
]);

export const FormButton = styled.button(() => [
  tw`w-full bg-primary border border-transparent rounded shadow-sm py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors duration-300`,
]);

export const Label = styled.label((isStacked) => [
  tw`flex mb-3 font-semibold text-sm`,
  isStacked ? tw`flex-col` : tw`items-center`,
]);

export const Input = styled.input((hasBorder) => [
  tw`w-full px-2 py-1 border-gray-300 rounded shadow-sm focus:ring-accent focus:border-accent-dark sm:text-sm`,
  hasBorder ? tw`border border-solid` : null,
]);

export const Select = styled.select(() => [
  tw`mt-1 block w-full pl-3 pr-10 py-2 mt-2 mb-4 text-base border-gray-300 focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm rounded-md`,
]);

export const Processing = styled.div(({ loading }) => [
  tw`flex justify-center p-3 mb-4 bg-primary-light text-white font-medium`,
  loading === 'true' ? tw`flex` : tw`hidden`,
]);
