/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dev-bg": "#0F172A", // Background
        "dev-card": "#1E293B", // Secondary
        "dev-cyan": "#22D3EE", // Accent
      },
      fontFamily: {
        mono: ["Fira Code", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
