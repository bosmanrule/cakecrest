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
          red: "#dc3545",
          "dark-red": "#8b0000",
          "light-red": "#ff6b6b",
          cream: "#fff5f5",
          "light-bg": "#fefafa",
        },
        food: {
          primary: "#e74c3c",
          secondary: "#c0392b",
          bg: "#fef5f4",
        },
        bread: {
          primary: "#d4a853",
          secondary: "#b8860b",
          bg: "#fdf8e8",
        },
        cake: {
          primary: "#e91e8c",
          secondary: "#c71585",
          bg: "#fdf0f7",
        },
      },
      fontFamily: {
        sans: [
          "Segoe UI",
          "Tahoma",
          "Geneva",
          "Verdana",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
