/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import tw, { styled } from 'twin.macro';
import { Popover, Menu, Transition } from '@headlessui/react';
import {
  SearchIcon,
  UserIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline';
import { Fragment } from 'react';
import Link from 'next/link';
import { NavStyles } from '../styles/NavStyles';
import SignOut from './SignOut';
import { useUser } from './User';
import { mainNav } from './config/mainNav';
import Cart from './Cart';
import { MyLink } from './MyLink';
import { Processing } from '../styles/Form';
import LoadingIcon from './icons/LoadingIcon';
import DisplayError from './ErrorMessage';

const CATEGORY_QUERY = gql`
  query SINGLE_ITEM_QUERY {
    categories(orderBy: [{ name: asc }]) {
      name
      slug
    }
  }
`;

export default function Nav() {
  const user = useUser();
  const router = useRouter();

  const { data, loading, error } = useQuery(CATEGORY_QUERY);

  if (loading)
    return (
      <Processing loading={loading.toString()}>
        <LoadingIcon tw="animate-spin" />
        Loading
      </Processing>
    );
  if (error) return <DisplayError error={error} />;
  const { categories } = data;

  return (
    <NavStyles tw="z-50">
      <Popover.Group tw="hidden lg:block lg:self-stretch">
        <div tw="flex h-full space-x-8">
          {mainNav.map((link) => (
            <Popover tw="flex" key={link.title}>
              {({ open }) => (
                <>
                  <div tw="flex">
                    <Popover.Button
                      className="group"
                      css={[
                        tw`flex items-center -mb-px text-xl font-medium uppercase border-b-2 border-transparent font-headers text-primary hover:text-primary-dark hover:border-primary`,
                      ]}
                    >
                      <span>{link.title}</span>
                      <ChevronDownIcon
                        css={[
                          tw`w-5 h-5 ml-2 transition duration-150 ease-in-out text-accent group-hover:text-opacity-80`,
                          open ? '' : 'text-opacity-70',
                        ]}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>
                  <PopOverStyledTransition
                    as={Fragment}
                    enter="enter"
                    enterFrom="enterFrom"
                    enterTo="enterTo"
                    leave="leave"
                    leaveFrom="leaveFrom"
                    leaveTo="leaveTo"
                  >
                    <Popover.Panel tw="absolute inset-x-0 top-full text-sm text-gray-500">
                      <div
                        tw="absolute inset-0 bg-white shadow top-1/2"
                        aria-hidden="true"
                      />
                      <div tw="relative bg-white">
                        <div tw="px-8 mx-auto max-w-7xl">
                          <div tw="grid grid-cols-2 py-16 gap-y-10 gap-x-8">
                            <div tw="grid grid-cols-2 col-start-2 gap-x-8">
                              <div
                                className="group"
                                tw="relative text-base sm:text-sm"
                              >
                                <div tw="overflow-hidden bg-gray-100 rounded-lg group-hover:opacity-75">
                                  <img
                                    src=""
                                    alt=""
                                    tw="object-cover object-center"
                                  />
                                </div>
                                <a
                                  href="/"
                                  tw="block mt-6 font-medium text-gray-900"
                                >
                                  <span
                                    tw="absolute inset-0 z-10"
                                    aria-hidden="true"
                                  />
                                </a>
                                <p aria-hidden="true" tw="mt-1">
                                  Shop now
                                </p>
                              </div>
                            </div>
                            <div tw="grid grid-cols-3 row-start-1 text-sm gap-y-10 gap-x-8">
                              <ul
                                className="columns-2"
                                tw="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                              >
                                {categories.map((category) => (
                                  <li tw="flex" key={category.name}>
                                    <a
                                      href={`${link.path}/${category.slug}`}
                                      tw="hover:text-gray-800"
                                    >
                                      {category.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </PopOverStyledTransition>
                </>
              )}
            </Popover>
          ))}
        </div>
      </Popover.Group>
      <div tw="flex items-center pb-5 space-x-8">
        <MyLink href="/search">
          <span tw="sr-only">Search</span>
          <SearchIcon tw="w-6 h-6 text-accent" aria-hidden="true" />
        </MyLink>

        <Menu as="div" tw="relative z-[100] h-6">
          <Menu.Button tw="inline-flex justify-center">
            <span tw="sr-only">More user options</span>
            <UserIcon tw="w-6 h-6 text-accent" />
          </Menu.Button>
          <StyledTransition
            enter="enter"
            enterFrom="enterFrom"
            enterTo="enterTo"
            leave="leave"
            leaveFrom="leaveFrom"
            leaveTo="leaveTo"
          >
            <Menu.Items
              as="ul"
              static
              tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md p-2 shadow-lg outline-none z-[99]"
            >
              <Menu.Item as="li">
                <Link href="/account">Account</Link>
              </Menu.Item>
              <Menu.Item as="li">
                <Link href="/orders">Orders</Link>
              </Menu.Item>
              {user && (
                <Menu.Item as="li">
                  <SignOut />
                </Menu.Item>
              )}
            </Menu.Items>
          </StyledTransition>
        </Menu>
        <Cart />
      </div>
    </NavStyles>
  );
}

const StyledTransition = styled(Transition)`
  &.enter {
    ${tw`transition duration-100 ease-out`}
  }
  &.enterFrom {
    ${tw`transform scale-95 opacity-0`}
  }
  &.enterTo {
    ${tw`transform scale-100 opacity-100`}
  }
  &.leave {
    ${tw`transition duration-75 ease-in`}
  }
  &.leaveFrom {
    ${tw`transform scale-100 opacity-100`}
  }
  &.leaveTo {
    ${tw`transform scale-95 opacity-0`}
  }
`;

const PopOverStyledTransition = styled(Transition)`
  &.enter {
    ${tw`transition duration-200 ease-out`}
  }
  &.enterFrom {
    ${tw`translate-y-1 opacity-0`}
  }
  &.enterTo {
    ${tw`translate-y-0 opacity-100`}
  }
  &.leave {
    ${tw`transition duration-150 ease-in`}
  }
  &.leaveFrom {
    ${tw`translate-y-0 opacity-100`}
  }
  &.leaveTo {
    ${tw`translate-y-1 opacity-0`}
  }
`;
