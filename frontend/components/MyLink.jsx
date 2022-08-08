import Link from 'next/link';
import { forwardRef } from 'react';

export const MyLink = forwardRef((props, ref) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});
