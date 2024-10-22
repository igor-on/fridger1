/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'dirty-white': '#edece8',
        'light-gray': '#A4A3A3',
        'very-light-gray': '#D9D9D9',
        'dark-gray': '#464646',
        'material-blue': '#005cbb',
      },
    },
  },
  plugins: [ require('@tailwindcss/typography') ],
}

