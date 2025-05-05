import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        neroland: {
          "primary": "#3b82f6",
          "secondary": "#8b5cf6",
          "accent": "#f59e0b",
          "neutral": "#1a1a2e",
          "base-100": "#0a0a1a",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
    darkTheme: "neroland",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  },
} as Config

export default config 