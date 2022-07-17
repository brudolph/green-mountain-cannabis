import tw, { styled, css } from 'twin.macro';

export const Form = styled.form(({ hasBorder }) => [
  `color: black;`,
  hasBorder && tw`border-purple-500`,
]);

export const FormButton = styled.button(() => [
  tw`bg-primary border border-transparent rounded shadow-sm py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors duration-300`,
]);

export const Label = styled.label(() => [tw`flex flex-col`]);

export const Input = styled.input(() => [
  tw`w-full rounded shadow-sm py-2 px-4 mb-4 flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark`,
]);

export const Select = styled.select(() => [
  tw`mt-1 block w-full pl-3 pr-10 py-2 mb-4 text-base border-gray-300 focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm rounded-md`,
]);

export const Processing = styled.div(({ loading }) => [
  tw`flex justify-center p-3 mb-4 bg-primary-light text-white font-medium`,
  loading === 'true' ? tw`block` : tw`hidden`,
]);
