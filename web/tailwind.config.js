/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      colors: {
        gray: {
          100: '#E1E1E6',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },
        ignite: {
          500: '#129E57',
        },
        explorer: {
          500: '#F7DD43',
          600: '#efd01f',
        },
      },
      backgroundImage: {
        bgApp: "url('/bg.png')",
      },
    },
  },
  plugins: [],
}
