import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "mint-50": "#f8fcf5",
        "mint-100": "#d7f2ba",
        "mint-200": "#bde4a8",
        "mint-300": "#9cc69b",
        "mint-400": "#79b4a9",
        "mint-500": "#676f54",
        "dark-mint-900": "#0f120d",
        "dark-mint-800": "#1a1f16",
        "dark-mint-700": "#2a3326",
        "dark-mint-600": "#3e4c3a",
        light: {
          primary: "#79b4a9",
          secondary: "#9cc69b",
          accent: "#676f54",
          background: "#f8fcf5",
          card: "#ffffff",
          text: "#2a2a2a",
          muted: "#e5e5e5",
        },
        dark: {
          primary: "#79b4a9",
          secondary: "#bde4a8",
          accent: "#d7f2ba",
          background: "#1a1f16",
          card: "#232a1e",
          text: "#e0e0e0",
          muted: "#2a3326",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundColor: {
        light: {
          DEFAULT: "#f8fcf5",
          card: "#ffffff",
          muted: "#e5e5e5",
        },
        dark: {
          DEFAULT: "#1a1f16",
          card: "#232a1e",
          muted: "#2a3326",
        },
      },
      textColor: {
        light: {
          DEFAULT: "#2a2a2a",
          muted: "#555555",
        },
        dark: {
          DEFAULT: "#e0e0e0",
          muted: "#b0b0b0",
        },
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
