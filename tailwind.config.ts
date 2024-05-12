import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "desktop-dark": "url('/images/bg-desktop-dark.jpg')",
        "desktop-light": "url('/images/bg-desktop-light.jpg')",
        "mobile-dark": "url('/images/bg-mobile-dark.jpg')",
        "mobile-light": "url('/images/bg-mobile-light.jpg')",
        "light-Fondo-gradient": "linear-gradient(to right,  #49b5d0, #a94bd7)",
        "dark-Fondo-gradient": "linear-gradient(to left,  #49b5d0, #a94bd7)",
      },
      colors: {
        // primary
        "Text-Active": "hsl(220, 98%, 61%)",

        // Light Theme 
        "Light-fondo": "hsl(236, 33%, 92%)",
        "Light-fondo-input": "hsl(0, 0%, 98%)",
        "Light-text-completed": "hsl(233, 11%, 84%)",
        "light-text-select": "hsl(234, 11%, 52%)",
        "Light-border": " hsl(236, 9%, 61%)",
        "Light-text-input": "hsl(237, 14%, 26%)",

        /* Dark Theme */
        "Dark-fondo": "hsl(235, 21%, 11%)",
        "Dark-fondo-input": " hsl(235, 24%, 19%)",
        "Dark-text": "hsl(234, 39%, 85%)",
        "Dark-text-hover": "hsl(236, 33%, 92%)",
        "Dark-border": "hsl(235, 19%, 35%)",
        "Dark-text-completed": "hsl(233, 14%, 35%)",
      },
    },
  },
  plugins: [],
};
export default config;
