import tw from 'twin.macro';
import { Menu, Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { MyLink } from '../components/MyLink';

export const NavStyles = tw.nav`flex items-center justify-between max-w-7xl mx-auto pt-4 px-5 mb-5 border-b border-gray-200 z-50`;

export const MenuStyles = tw(Menu)`relative z-[100] h-6`;

export const MenuButtonStyles = tw(Menu.Button)`inline-flex justify-center`;

export const MenuItemsStyles = tw(
  Menu.Items
)`absolute right-0 w-64 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md p-3 shadow-lg outline-none z-[99]`;

export const MenuItemStyles = tw(Menu.Item)`p-1`;

export const MenuLinkStyles = tw(
  MyLink
)`block px-3 py-2 text-base font-semibold text-gray-600 hover:bg-primary/10 hover:no-underline transition-colors duration-300`;

// Main Nav Popover

export const PopOverGroupStyles = tw.div`hidden lg:block lg:self-stretch`;

export const PopOverButtonStyles = tw(
  Popover.Button
)`flex items-center text-xl font-semibold uppercase border-b-2 border-transparent font-headers text-primary hover:text-primary-dark hover:border-primary`;

export const PopOverPanelStyles = tw(
  Popover.Panel
)`absolute inset-x-0 top-full bg-white`;

export const PopOverWrapperStyles = tw.div`relative px-8 mx-auto max-w-7xl grid grid-cols-2 py-10 gap-y-10 gap-x-8`;

export const MainNavItemsStyles = tw.ul`grid grid-cols-3 gap-x-6 `;

export const MainNavItemStyles = tw.li`p-1`;

export const MainNavLinkStyles = tw.a`block px-3 py-2 text-base font-semibold text-gray-600 hover:bg-primary/10 hover:no-underline transition-colors duration-300`;
