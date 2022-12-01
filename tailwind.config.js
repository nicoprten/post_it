/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx,js}"],
  theme: {
    extend: {
      width: {
        '100vw': '100vw',
        '80vw': '80vw',
        '60vw': '60vw'
      },
      fontFamily: {
        kanit: ['Kanit', 'Roboto'],
        rubik: ['Rubik']
      },
      fontSize: {
        normal: '16px'
      },
      borderWidth: {
        1: '1px',
      },
      display: ["group-hover"],
    },
    colors: {
      'white-dark': '#EFF3F4',
      'white': '#FFFFFF',
      'black': '#070707',
      'black-light': '#16181C',
      'gray': '#536471',
      'blue-dark': '#123540',
      'blue': '#1D9BF0',
      'red': 'ED6A5A'
    }
  },
  plugins: [],
}