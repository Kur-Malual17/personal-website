/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#0066CC',
        'primary-green': '#00A86B',
        'dark-blue': '#003D82',
        'light-blue': '#E6F2FF',
      },
    },
  },
  plugins: [],
}
