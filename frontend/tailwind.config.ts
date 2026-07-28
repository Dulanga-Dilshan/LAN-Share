import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          900: "#14181C",
          800: "#1E252B",
          700: "#272F36",
          600: "#3A444C",
          500: "#5A6670",
        },
        paper: "#E8E4DA",
        yellow: {
          DEFAULT: "#F2B705",
          dim: "#B88A04",
        },
        signal: {
          red: "#D64545",
          green: "#4CAF6D",
        },
      },
      fontFamily: {
        display: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "diagonal-stripes":
          "repeating-linear-gradient(135deg, rgba(242,183,5,0.08) 0px, rgba(242,183,5,0.08) 10px, transparent 10px, transparent 20px)",
      },
      keyframes: {
        stamp: {
          "0%": { transform: "scale(2.2) rotate(-8deg)", opacity: "0" },
          "60%": { transform: "scale(0.95) rotate(-8deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-8deg)", opacity: "1" },
        },
        slidein: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        stamp: "stamp 0.35s cubic-bezier(.2,.9,.3,1.2) forwards",
        slidein: "slidein 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
