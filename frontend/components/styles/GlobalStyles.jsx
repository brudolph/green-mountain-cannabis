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
  h1: {
    ...tw`font-headers !font-bold text-primary-dark text-3xl uppercase tracking-wide mb-6`,
  },
  h2: {
    ...tw`font-headers !font-bold text-accent-dark text-xl uppercase`,
  },
  h3: {
    ...tw`font-headers !font-bold text-text text-xl`,
  },
  '.swiper-pagination-bullet': {
    ...tw`bg-white/60 w-5 h-5 pt-[1px]  text-xs text-black opacity-100 border border-gray-200`,
  },
  '.swiper-pagination-bullet-active': {
    background: theme`colors.accent`,
    ...tw`font-bold border-accent`,
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
