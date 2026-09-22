import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefaf6",
          100: "#d7f3e8",
          200: "#b2e6d4",
          300: "#7fd3bc",
          400: "#49b99e",
          500: "#109b7d",
          600: "#0b7d65",
          700: "#0b6452",
          800: "#0c5043",
          900: "#0c4238",
          950: "#052520",
        },
        ghanaGold: {
          DEFAULT: "#FCD116",
          dark: "#D4A50E",
        },
      },
    },
  },
  plugins: [],
};
export default config;
