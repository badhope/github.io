import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5d76e",
        primaryLight: "#ffeb99",
        primaryDark: "#d4af37",
        accentBlue: "#4d9fff",
        accentPurple: "#a78bfa",
        accentCyan: "#22d3ee",
        accentGreen: "#4ade80",
        bg: {
          dark: "#0a0f2a",
          darker: "#070a1a",
          card: "rgba(25, 35, 80, 0.9)",
          glass: "rgba(20, 30, 70, 0.7)"
        },
        text: {
          bright: "#ffffff",
          normal: "#e0e0f0",
          muted: "#a0a0c0"
        }
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "twinkle": "twinkle 2s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" }
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(245, 215, 110, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(245, 215, 110, 0.6)" }
        },
        twinkle: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
