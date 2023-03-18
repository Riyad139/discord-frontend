/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        lightGray: "#424549",
        mediumGray: "#36393e",
        mediumDark: "#282b30",
        dark: "#1e2124",
        lightBluish: "#7289da",
        mediumBluish: "#5865F2",
      },
    },
  },
  plugins: [],
};
