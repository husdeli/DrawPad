const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: colors.purple,
      },
    },
  },
  plugins: [],
};
