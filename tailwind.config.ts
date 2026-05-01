import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    /**
     * We replace Tailwind's default palette with our own tokens so that
     * accidental use of `bg-gray-50` or `text-blue-500` doesn't compile —
     * a developer is forced to use the design system.
     */
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ink: "#0A0A0A",
      paper: "#FFFFFF",
      mist: "#F5F6F7",
      line: "#E5E7EB",
      muted: "#6B7280",
      brand: {
        DEFAULT: "#0B5FFF",
        700: "#084ACC",
        50: "#EAF1FF",
      },
      success: "#047857",
      warning: "#B45309",
      danger: "#B91C1C",
    },
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.625rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      spacing: {
        "0.5": "2px",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "4px",
        md: "6px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,10,10,0.04), 0 1px 1px rgba(10,10,10,0.06)",
        drawer: "0 16px 40px -8px rgba(10,10,10,0.18), 0 4px 12px rgba(10,10,10,0.08)",
        focus: "0 0 0 2px #FFFFFF, 0 0 0 4px #0B5FFF",
      },
      maxWidth: {
        site: "1320px",
        prose: "68ch",
      },
      transitionDuration: {
        fast: "120ms",
      },
    },
  },
  plugins: [],
};

export default config;
