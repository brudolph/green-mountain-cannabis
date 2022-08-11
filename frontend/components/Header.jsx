import 'twin.macro';
import Announcement from './Announcement';
import Nav from './Nav';
import Logo from '../public/static/gmc-logo.svg';
import { useUser } from './User';
import Cart from './Cart';
import { HeaderStyles } from './styles/HeaderStyles';
import { MyLink } from './MyLink';

export default function Header() {
  const user = useUser();
  return (
    <HeaderStyles>
      <Announcement>
        {user && <p>Free Shipping for orders over $100</p>}
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
      {!user && (
        <div tw="max-w-7xl mx-auto flex justify-end px-5 py-3">
          <MyLink
            href="/signin"
            tw="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-gray-600 ring-1 ring-gray-600/10 hover:ring-gray-600/20"
          >
            Sign In
          </MyLink>
        </div>
      )}
      {/* <Search /> */}
    </HeaderStyles>
  );
}
