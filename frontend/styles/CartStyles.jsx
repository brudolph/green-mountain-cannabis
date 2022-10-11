import tw, { styled } from 'twin.macro';
import { Popover } from '@headlessui/react';
import ImageWithFallback from '../components/FallbackImage.tsx';

export const CartItemStyles = styled.li(() => [tw`flex items-center py-6`]);

export const ProductImage = tw(
  ImageWithFallback
)`object-cover object-center rounded-md border border-gray-200`;

export const CartStyles = tw(
  Popover
)`ml-4 flow-root text-sm lg:relative lg:ml-8 z-50`;

export const CartButtonStyles = tw(Popover.Button)`-m-2 flex items-center p-2`;

export const CartPanelStyles = tw(
  Popover.Panel
)`absolute inset-x-0 top-16 mt-px bg-white py-5 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5`;

export const CheckoutButton = styled.a(() => [
  tw`w-full px-4 py-2 text-sm font-medium text-center text-white border border-transparent rounded-md shadow-sm bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 focus:ring-offset-gray-50`,
]);
