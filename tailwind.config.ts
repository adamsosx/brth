import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
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