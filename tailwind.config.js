/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#071523',
        ice: '#8bd7f1',
        frost: '#d9eef7',
      },
      fontFamily: {
        display: ['"Segoe UI Variable Display"', '"Aptos Display"', '"Segoe UI"', 'sans-serif'],
        sans: ['"Segoe UI Variable Text"', '"Aptos"', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(93, 187, 229, .16)',
        soft: '0 20px 60px rgba(0, 9, 23, .22)',
      },
    },
  },
  plugins: [],
}
