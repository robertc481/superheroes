// Tailwind v4: loaded via @config in globals.css. Using .mjs avoids Node MODULE_TYPELESS_PACKAGE_JSON when loading config.
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        hero: {
          primary: "#1e3a5f",
          secondary: "#c62828",
          accent: "#f9a825",
          dark: "#0d1b2a",
          light: "#e0e7ef",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
