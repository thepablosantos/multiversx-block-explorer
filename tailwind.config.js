/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': 'var(--main-bg)',
        'card-bg': 'var(--card-bg)',
        'accent': 'var(--accent)'
      }
    },
  },
  plugins: [],
}

