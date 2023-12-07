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
        'dirty-white': '#edece8'
      },
    },
  },
  plugins: [ require('@tailwindcss/forms'), require('@tailwindcss/typography') ],
}

