import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A5568",
          dark: "#2D3748",
          light: "#718096",
        },
        secondary: {
          DEFAULT: "#ED8936",
          dark: "#DD6B20",
          light: "#F6AD55",
        },
        background: "#FAF7F2",
        text: {
          DEFAULT: "#1A202C",
          light: "#4A5568",
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
    },
  },
  plugins: [],
} satisfies Config;