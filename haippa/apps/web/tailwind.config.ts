import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C15F3C",
          50: "#FBF0EB", 100: "#F6D9CE", 200: "#EDAF9B", 300: "#E48668",
          400: "#D47054", 500: "#C15F3C", 600: "#A14D2E", 700: "#7D3B22",
          800: "#592817", 900: "#35160C",
        },
        secondary: {
          DEFAULT: "#D4933F",
          50: "#FBF4E8", 100: "#F5E4C5", 200: "#EBC98A", 300: "#E0AD50",
          400: "#D4933F", 500: "#BC7B2D", 600: "#99621F", 700: "#764915",
          800: "#52310D", 900: "#2F1A05",
        },
        sand: {
          50: "#FDFAF6", 100: "#FAF7F2", 200: "#F0E8DA", 300: "#E8DDD0",
          400: "#D9CAB8", 500: "#C4AE96", 600: "#A08870", 700: "#7A6552",
          800: "#534438", 900: "#2C231C",
        },
        charcoal: {
          DEFAULT: "#1C1A17",
          50: "#F5F4F3", 100: "#ECEAE7", 200: "#D4D0CA", 300: "#B8B3AB",
          400: "#8F897F", 500: "#6B6358", 600: "#524B41", 700: "#3A342C",
          800: "#282319", 900: "#1C1A17",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(28,26,23,0.08), 0 1px 2px rgba(28,26,23,0.04)",
        "card-hover": "0 8px 24px rgba(28,26,23,0.12), 0 2px 8px rgba(28,26,23,0.06)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-in": "fade-in 0.4s ease-out" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
