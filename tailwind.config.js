/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        bgprimary: '#2c1e4a',
        bgblack: 'rgb(25, 25, 25)',
        grey: '#d8d8d8'
      },
      fontFamily:{
        'yoga': 'yoga',
        'simple': 'simple',
      }

    }
  },
  plugins: []
};