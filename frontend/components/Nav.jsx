import { useRouter } from 'next/router';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { NavStyles } from './styles/NavStyles';
import SignOut from './SignOut';
import { useUser } from './User';
import { useCart } from '../context/cartState';
import CartCount from './CartCount';
import { MyLink } from './MyLink';
import { mainNav } from './config/mainNav';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  const router = useRouter();

  return (
    <NavStyles>
      <ul tw="flex space-x-8 pb-5">
        {mainNav.map((link) => (
          <li key={link.path}>
            <Link href={link.path} passHref>
              <a
                css={[
                  tw`uppercase text-xl font-headers font-medium border-b-2 -mb-px border-transparent text-primary hover:text-primary-dark hover:border-primary`,
                  router.pathname === link.path && tw`border-primary`,
                ]}
              >
                {link.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div tw="flex items-center pb-5 space-x-8">
        <MyLink href="/search">
          <span tw="sr-only">Search</span>
          <SearchIcon tw="w-6 h-6 text-accent" aria-hidden="true" />
        </MyLink>

        <Menu>
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
              tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md p-2 shadow-lg outline-none z-50"
            >
              <Menu.Item as="li">
                <MyLink href="/account">Account</MyLink>
              </Menu.Item>
              <Menu.Item as="li">
                <MyLink href="/orders">Orders</MyLink>
              </Menu.Item>
              {user && (
                <Menu.Item as="li">
                  <SignOut />
                </Menu.Item>
              )}
            </Menu.Items>
          </StyledTransition>
        </Menu>
        <button type="button" onClick={openCart} tw="flex items-center">
          <span tw="sr-only">My Cart</span>
          <ShoppingCartIcon tw="w-6 h-6 text-accent" />
          <CartCount count={user.cart.length} />
        </button>
      </div>
    </NavStyles>
  );
}

const StyledTransition = styled(Transition)`
  &.enter {
    ${tw`transition ease-out duration-100`}
  }
  &.enterFrom {
    ${tw`transform scale-95 opacity-0`}
  }
  &.enterTo {
    ${tw`transform scale-100 opacity-100`}
  }
  &.leave {
    ${tw`transition ease-in duration-75`}
  }
  &.leaveFrom {
    ${tw`transform scale-100 opacity-100`}
  }
  &.leaveTo {
    ${tw`transform scale-95 opacity-0`}
  }
`;
