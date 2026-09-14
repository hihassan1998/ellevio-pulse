/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ellevio: {
          primary: "#0b8454",
          primaryHover: "#0f5a46",
          primaryContainer: "#e7f6f0",
          secondary: "#ce1f36",
          tertiary: "#f5a623",
          surface: "#ffffff",
          surfaceDim: "#f2f1f0",
          surfaceContainer: "#e7f6f0",
          text: "#2c2827",
          textMuted: "#757575",
          border: "#e5e3e1"
        }
      },
      fontFamily: {
        sans: ["FuturaEF-Book", "Arial", "Helvetica", "sans-serif"],
        heading: ["FuturaEF-DemiBold", "Arial", "Helvetica", "sans-serif"]
      }
    },
  },
  plugins: [],
}
