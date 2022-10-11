import tw, { styled } from 'twin.macro';

export const AddToCartStyles = styled.button(() => [
  tw`w-full disabled:bg-primary/60 disabled:cursor-not-allowed disabled:hover:bg-gray-400 bg-primary-light hover:bg-primary  border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark`,
]);
