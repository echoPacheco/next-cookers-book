import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        kalam: ["Kalam", "cursive"],
      },
      colors: {
        white: "#FFFBF2",
        brown: "#815A39",
        dark_brown: "#472C1B",
        grey: "#AA9E96",
        light_grey: "#C6BEB8",
      },
    },
  },
  plugins: [],
};
export default config;
