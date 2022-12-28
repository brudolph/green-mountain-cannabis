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
    ...tw`font-headers !font-bold text-primary-dark text-4xl uppercase tracking-wide pb-3 mb-6 border-b border-primary-light/20`,
  },
  '.h1': {
    ...tw`font-headers !font-bold text-primary-dark text-4xl uppercase tracking-wide pb-3 mb-6 border-b border-primary-light/20`,
  },
  h2: {
    ...tw`font-headers !font-bold text-primary text-3xl uppercase tracking-wide`,
  },
  h3: {
    ...tw`font-sans !font-bold text-text text-xl`,
  },
  a: {
    ...tw`text-primary-dark hover:underline`,
  },
  p: {
    ...tw`mb-4`,
  },
  'input + span:before': {
    ...tw`absolute -right-5 top-1.5`,
  },
  'input.error:invalid + span': {
    ...tw`after:content-["✖"] text-red-500 border-red-500 ml-2 mt-2`,
  },
  '.swiper-pagination-bullet': {
    ...tw`w-3 h-3 text-xs text-black border border-gray-200 opacity-100 bg-white/60`,
  },
  '.swiper-pagination-bullet-active': {
    background: theme`colors.accent`,
    ...tw`font-bold border-accent`,
  },
  '.swiper-slide-thumb-active': {
    ...tw`border-2 rounded-lg border-accent`,
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
