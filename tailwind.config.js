/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        star: '#FDE68A',
        space: '#0B1020',
        signal: '#7DD3FC',
      }
    },
  },
  plugins: [],
}

