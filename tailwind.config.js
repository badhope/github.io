/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#020510',
        foreground: '#e8e8f0',
        gold: {
          DEFAULT: '#d4af37',
          light: '#f0d060',
          dark: '#b8941e',
          glow: 'rgba(212, 175, 55, 0.3)',
        },
        cosmic: {
          blue: '#1a73e8',
          purple: '#7c3aed',
          cyan: '#06b6d4',
          dark: '#0a0e27',
          deeper: '#020510',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        terminal: ['Share Tech Mono', 'monospace'],
        code: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'star-pulse': 'star-pulse 3s ease-in-out infinite',
        'meteor': 'meteor 1.5s linear infinite',
        'nebula-drift': 'nebula-drift 15s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-cosmic': 'linear-gradient(135deg, #020510 0%, #0a0e27 30%, #1a0a3e 60%, #020510 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)',
        'gradient-blue-gold': 'linear-gradient(135deg, #1a73e8 0%, #d4af37 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.2)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.3)',
        'blue': '0 0 20px rgba(26, 115, 232, 0.2)',
        'purple': '0 0 20px rgba(124, 58, 237, 0.2)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 12px 48px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
