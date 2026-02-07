/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0f172a",
        mint: "#10b981",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(16,185,129,0.35), 0 0 35px rgba(16,185,129,0.2)",
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at top, rgba(16,185,129,0.24), transparent 55%), radial-gradient(circle at 20% 20%, rgba(59,130,246,0.18), transparent 40%)",
      },
    },
  },
  plugins: [],
};
