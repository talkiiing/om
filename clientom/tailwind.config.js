module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
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
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      scale: ['focus-within', 'group-focus'],
      textColor: ['active', 'disabled'],
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
      },
    },
  },
  plugins: [],
}
