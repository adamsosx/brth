import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'calm-primary': '#1a365d',
        'calm-accent': '#2c5282',
        ocean: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        calm: {
          primary: '#1e3a8a',    // Deep blue
          secondary: '#93c5fd',  // Light blue
          accent: '#3b82f6',     // Bright blue
          text: '#1e293b',       // Slate blue
          light: '#f0f9ff',      // Very light blue
          dark: '#1e40af',       // Dark blue
          card: '#ffffff',       // White
          hover: '#2563eb'       // Hover blue
        },
      },
    },
  },
  plugins: [],
};

export default config; 