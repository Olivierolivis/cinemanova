/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(16, 185, 129, 0.35)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(16,185,129,0.18), transparent 35%), linear-gradient(135deg, rgba(6,78,59,0.9), rgba(3,7,18,0.95))",
      },
      fontFamily: {
        display: ["Trebuchet MS", "sans-serif"],
        body: ["Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
