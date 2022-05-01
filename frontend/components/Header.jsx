import Link from 'next/link';
import tw, { styled } from 'twin.macro';
import Nav from './Nav';

const HeaderStyles = styled.header`bg-green`;

export default function Header() {
  return (
    <HeaderStyles>
      <Link href="/" tw="">
        Green Mountain Cannabis
      </Link>
      <Nav />
    </HeaderStyles>
  );
}
