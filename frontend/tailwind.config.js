/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary-rgb) / <alpha-value>)",
        accent: "rgb(var(--color-primary-rgb) / <alpha-value>)",
        bgDark: "#0F172A",
        surfaceDark: "#1E293B",
        textSoft: "#E5E7EB",
      },
      boxShadow: {
        panel: "0 10px 30px rgba(2,6,23,0.08)",
      },
    },
  },
  plugins: [],
};
