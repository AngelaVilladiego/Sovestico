/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      brand: ["DM Serif Display", "serif"],
      body: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
