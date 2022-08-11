import PropTypes from 'prop-types';
import Link from 'next/link';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
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

MyLink.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
};
