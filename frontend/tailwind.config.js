module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'transition',
    'transform',
    'duration-100',
    'duration-75',
    'scale-95',
    'scale-100',
    'opacity-0',
    'opacity-100',
    'ease-out',
  ],
  theme: {
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      crosshair: 'crosshair',
      'zoom-in': 'zoom-in',
    },
    extend: {
      fontFamily: {
        headers: ['Signika', 'Arial', 'sans-serif'],
        altHeaders: ['"Asap Condensed"', 'Arial', 'sans-serif'],
        sans: ['"Open Sans"', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4A7639',
          light: '#729b62',
          dark: '#2b511b',
        },
        secondary: '#85AC59',
        accent: {
          DEFAULT: '#F0982E',
          dark: '#ce7b16',
          light: '#f7bb72',
        },
        text: '#272932',
        links: '#2b511b',
        dark: '#000000',
        light: '#e2e2e2',
        error: '#b81717',
        transparent: 'transparent',
      },
      aspectRatio: {
        square: '1/1',
        thumbs: '16/12',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
