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
    ...tw`font-sans !font-bold text-text text-xl`,
  },
  '.swiper-pagination-bullet': {
    ...tw`w-3 h-3 text-xs text-black border border-gray-200 opacity-100 bg-white/60`,
  },
  '.swiper-pagination-bullet-active': {
    background: theme`colors.accent`,
    ...tw`font-bold border-accent`,
  },
  '::placeholder': {
    ...tw`text-sm font-normal`,
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
