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
      },
    },
  },
  plugins: [],
};
export default config;
