import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#F8FAFC",
          dark: "#0F172A",
        },
        fg: {
          DEFAULT: "#0F172A",
          dark: "#F8FAFC",
        },
        muted: {
          DEFAULT: "#64748B",
          dark: "#94A3B8",
        },
        accent: {
          start: "#3B82F6",
          end: "#8B5CF6",
        },
      },
      borderRadius: {
        card: "1rem",
        input: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(to right, #3B82F6, #8B5CF6)",
      },
    },
  },
  plugins: [],
};

export default config;
