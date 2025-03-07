
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FFB400",
          foreground: "#1E1E24",
        },
        background: "#1E1E24",
        whitesmoke: "#F2F0EF",
        positive: "#77DD77",
        negative: "#FF6961",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#FFB400",
        foreground: "#F2F0EF",
        card: {
          DEFAULT: "rgba(30, 30, 36, 0.7)",
          foreground: "#F2F0EF",
        },
        accent: {
          DEFAULT: "#FFB400",
          foreground: "#1E1E24",
        },
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: 'float 3s ease-in-out infinite',
        fadeIn: 'fadeIn 1s ease-in-out 2s forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
