/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          'brand-primary': '#3B82F6',
          'brand-secondary': '#10B981',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }