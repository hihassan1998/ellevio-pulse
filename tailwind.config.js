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
          blue: "#005A9C",
          darkBlue: "#003A66",
          lightBg: "#F0F7FC",
          emerald: "#10B981",
          gold: "#F59E0B"
        }
      }
    },
  },
  plugins: [],
}
