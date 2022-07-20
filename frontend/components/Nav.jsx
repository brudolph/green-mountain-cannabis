import { Fragment, forwardRef } from 'react';
import tw, { styled } from 'twin.macro';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';
import NavStyles from './styles/NavStyles';
import SignOut from './SignOut';
import { useUser } from './User';
import Cart from './Cart';
import CloseButton from './styles/CloseButton';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

const MyLink = forwardRef((props, ref) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

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

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <ul tw="flex space-x-8">
        <li>
          <a
            href="/"
            tw="uppercase text-xl font-headers font-medium border-b-2 -mb-px border-transparent text-primary hover:text-primary-dark hover:border-primary"
          >
            Recreational
          </a>
        </li>
        <li>
          <a
            href="/"
            tw="uppercase text-xl font-headers font-medium border-b-2 -mb-px border-transparent text-primary hover:text-primary-dark hover:border-primary"
          >
            Medical
          </a>
        </li>
      </ul>
      <div tw="flex items-center">
        <div tw="relative inline-block text-left">
          <Menu>
            <>
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
                  tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <Menu.Item as="li">
                    <MyLink href="/account">Account</MyLink>
                  </Menu.Item>
                  <Menu.Item as="li">
                    <MyLink href="/orders">Orders</MyLink>
                  </Menu.Item>
                  {user && (
                    <>
                      <Menu.Item as="li">
                        <MyLink href="/sell">Sell</MyLink>
                      </Menu.Item>
                      <Menu.Item as="li">
                        <SignOut />
                      </Menu.Item>
                    </>
                  )}
                </Menu.Items>
              </StyledTransition>
            </>
          </Menu>
        </div>
        <button type="button" onClick={openCart} tw="flex items-center">
          <span tw="sr-only">My Cart</span>
          <ShoppingCartIcon tw="w-6 h-6 text-accent" />
          <CartCount
            count={user.cart.reduce(
              (tally, cartItem) =>
                tally + (cartItem.product ? cartItem.quantity : 0),
              0
            )}
          />
        </button>
      </div>
    </NavStyles>
  );
}
