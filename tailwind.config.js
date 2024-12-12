import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        backgroundGray: '#F3F4F5',
        borderlineGray: '#E1E2E3',
        inputGray: '#8A8A8A',
        textGray: '#6F6F6F',
      },
    },
  },
  plugins: [scrollbar],
};
