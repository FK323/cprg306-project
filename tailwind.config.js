/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00539C",
          light: "#1a6ab1",
          dark: "#003d73",
        },
        background: {
          DEFAULT: "#ffffff",
          light: "#f8fafc",
        },
        text: {
          DEFAULT: "#333333",
          light: "#6b7280",
          muted: "#9ca3af",
        },
      },
    },
  },
  plugins: [],
};
