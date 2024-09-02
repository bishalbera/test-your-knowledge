import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#012030",
        "button-color": "#AD49E1",
        "button-hover-color": "#7A1CAC",
        "text-color": "#EBD3F8",
        "custom-dark": "hsl(220, 18%, 3%)", 
        "cus-white": "hsl(0,0%,100%)",
        "white-transparent": "hsla(0,0%,100%,0.06)",
      },
    },
    keyframes: {
      "fade-out-down": {
        from: {
          opacity: "1",
          transform: "translateY(0)",
        },
        to: {
          opacity: "0",
          transform: "translateY(40%)",
        },
      },
    },
    animation: {
      "fade-out-down": "fade-out-down  linear forwards",
    },
    supports: {
      "no-scroll-driven-animations": "not(animation-timeline: scroll())",
    },
  },
  plugins: [],
};
export default config;
