import React from 'react';
import { Global, css } from '@emotion/react';
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro';

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.primary.dark`,
    ...tw`antialiased`,
  },
  '.aspect-video': {
    aspectRatio: '16/9',
  },
  h2: {
    ...tw`font-headers !font-bold text-accent !text-xl uppercase`,
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
