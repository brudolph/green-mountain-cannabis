/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { gql, useQuery } from '@apollo/client';
import tw, { styled } from 'twin.macro';
import { Popover, Transition } from '@headlessui/react';
import {
  SearchIcon,
  UserIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline';
import { Fragment } from 'react';
import {
  MainNavItemsStyles,
  MainNavItemStyles,
  MainNavLinkStyles,
  MenuButtonStyles,
  MenuItemsStyles,
  MenuItemStyles,
  MenuLinkStyles,
  MenuStyles,
  NavStyles,
  PopOverButtonStyles,
  PopOverGroupStyles,
  PopOverPanelStyles,
  PopOverWrapperStyles,
} from '../styles/NavStyles';
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

const ChevronDownStyles = {
  // Move long class sets out of jsx to keep it scannable
  icon: ({ open }) => [
    tw`w-5 h-5 ml-2 transition duration-150 ease-in-out text-accent group-hover:text-opacity-80`,
    open ? '' : 'text-opacity-70',
  ],
};

export default function Nav() {
  const user = useUser();

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
    <NavStyles>
      <PopOverGroupStyles>
        <div tw="flex h-full space-x-8 pb-3">
          {mainNav.map((link) => (
            <Popover tw="flex" key={link.title}>
              {({ open }) => (
                <>
                  <div tw="flex">
                    <PopOverButtonStyles className="group">
                      {link.title}
                      <ChevronDownIcon
                        css={ChevronDownStyles.icon({ open })}
                        aria-hidden="true"
                      />
                    </PopOverButtonStyles>
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
                    <PopOverPanelStyles>
                      <PopOverWrapperStyles>
                        <MainNavItemsStyles>
                          {categories.map((category) => (
                            <MainNavItemStyles key={category.name}>
                              <MainNavLinkStyles
                                href={`${link.path}/${category.slug}`}
                              >
                                {category.name}
                              </MainNavLinkStyles>
                            </MainNavItemStyles>
                          ))}
                        </MainNavItemsStyles>
                        <div tw="grid grid-cols-2 gap-x-8" />
                      </PopOverWrapperStyles>
                    </PopOverPanelStyles>
                  </PopOverStyledTransition>
                </>
              )}
            </Popover>
          ))}
        </div>
      </PopOverGroupStyles>
      <div tw="flex items-center pb-3 space-x-8">
        <MyLink href="/search">
          <span tw="sr-only">Search</span>
          <SearchIcon tw="w-6 h-6 text-accent" aria-hidden="true" />
        </MyLink>

        <MenuStyles as="div" tw="">
          <MenuButtonStyles>
            <span tw="sr-only">More user options</span>
            <UserIcon tw="w-6 h-6 text-accent" />
          </MenuButtonStyles>
          <StyledTransition
            enter="enter"
            enterFrom="enterFrom"
            enterTo="enterTo"
            leave="leave"
            leaveFrom="leaveFrom"
            leaveTo="leaveTo"
          >
            <MenuItemsStyles as="ul" static>
              <MenuItemStyles as="li">
                <MenuLinkStyles href="/account">Account</MenuLinkStyles>
              </MenuItemStyles>
              <MenuItemStyles as="li">
                <MenuLinkStyles href="/orders">Orders</MenuLinkStyles>
              </MenuItemStyles>
              {user && (
                <MenuItemStyles as="li">
                  <SignOut />
                </MenuItemStyles>
              )}
            </MenuItemsStyles>
          </StyledTransition>
        </MenuStyles>
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
