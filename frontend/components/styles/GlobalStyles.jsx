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
  '.swiper-pagination-bullet': {
    width: '10px',
    height: '10px',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: '12px',
    color: '#000',
    opacity: '1',
    background: 'rgba(255, 255, 255, 0.6)',
    ...tw`shadow-lg`,
  },
  '.swiper-pagination-bullet-active': {
    color: '#fff',
    background: theme`colors.accent`,
  },
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
