module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/index.css',
    './public/index.html',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    minWidth: {
      '80': '20rem',
    },
    extend: {
      maxHeight: {
        12: '3rem',
      },
      margin: {
        '-18': '-4.5rem',
      },
      zIndex: {
        full: '1000',
      },
      colors: {
        text: {
          highlight: '#FCFCFF',
          default: '#A6A6A6',
        },
        background: {
          default: '#1C1C1C',
          surface: '#252525',
          'surface-lighter': '#363636',
          'surface-light': '#424242',
        },
        accent: {
          DEFAULT: '#80FA55',
        },
        gray: {
          900: '#222230',
        },
        omheader: '#1F2937',
        omblue: {
          DEFAULT: '#3B82F6',
          50: '#EBF2FE',
          100: '#D7E6FD',
          200: '#B0CDFB',
          300: '#89B4FA',
          400: '#629BF8',
          500: '#3B82F6',
          600: '#1469F4',
          700: '#0A57D6',
          800: '#0847AF',
          900: '#063788',
        },
        ompurple: {
          DEFAULT: '#5B21B6',
          50: '#BFA1EE',
          100: '#B38FEB',
          200: '#9B6DE5',
          300: '#844ADE',
          400: '#6C28D8',
          500: '#5B21B6',
          600: '#521EA5',
          700: '#4A1B93',
          800: '#411882',
          900: '#381471',
        },
        omblack: '#181824',
        omgray: '#242435',
        omgray2: '#2B2B3F',
        omwhite: '#ffffff',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      scale: ['focus-within', 'group-focus'],
      textColor: ['active', 'disabled'],
    },
  },
  plugins: [],
}
