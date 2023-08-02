/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const extraCSS = plugin(function ({ addUtilities }) {
  addUtilities({
    ".perspective-1000": {
      perspective: "1000px",
    },
    ".transform-style-preserve-3d": {
      "transform-style": "preserve-3d",
    },
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [extraCSS, require("daisyui")],
};
