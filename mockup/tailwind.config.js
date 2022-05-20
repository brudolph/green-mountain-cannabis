module.exports = {
  content: ['./src/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A7639',
          light: '#729b62',
          dark: '#2b511b'
        },
        secondary:'#85AC59',
        accent: '#F3AB53',
        text: '#272932',
        links: '#2b511b',
        dark: '#000000',
        light: '#e2e2e2',
        error: '#b81717',
        transparent: 'transparent',
      }
    },
  },
  variants: {
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'),],
};
