/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',
          blue: '#3b82f6',
          orange: '#f97316'
        }
      }
    },
  },
  plugins: [],
}

