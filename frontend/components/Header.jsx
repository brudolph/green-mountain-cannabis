import Link from 'next/link';
import tw, { styled } from 'twin.macro';
import Announcement from './Announcement';
import Nav from './Nav';
import Logo from '../public/static/gmc-logo.svg';
import SignIn from './SignIn';
import { useUser } from './User';
import Cart from './Cart';
import Search from './Search';

const HeaderStyles = tw.header`bg-white`;

export default function Header() {
  const user = useUser();
  return (
    <HeaderStyles>
      <Announcement>
        <p>Free Shipping for orders over $100</p>
      </Announcement>
      <div tw="hidden lg:flex lg:items-center lg:justify-center">
        <a href="/">
          <img src={Logo} alt="Green Mountain Cannabis" />
        </a>
      </div>
      {user && (
        <>
          <Nav />
          <Cart />
        </>
      )}
      <Search />
    </HeaderStyles>
  );
}
