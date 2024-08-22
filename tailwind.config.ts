/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      lato: ['var(--font-lato)']
    },
    extend: {
      spacing: {
        "quick-btn-right": '34px',
        "quick-btn-bottom": '27px',
        "quick-btn-gap": "26px",
        "quick-other-gap": "16px",
        "card-bottom": "110px",
        "card-height": "737px",
        "card-width": "734px"
      },
      colors: {
        "quick-btn": {
          white: "#F2F2F2"
        },
        primary: {
          blue: "#2F80ED",
          maingray: "#333333",
          gray1: "#4F4F4F",
          gray2: "#828282",
          gray3: "#E0E0E0",
        },
        indicator: {
          sandybrown: "#F8B76B",
          purple: "#8785FF",
          tomato: "#EB5757",
          cream: "#F2C94C"
        },
        chats: {
          main: {
            yellow: "#FCEED3",
            purple: "#EEDCFF",
            green: "#D2F2EA"
          },
          badge: {
            yellow: "#E5A443",
            purple: "#9B51E0",
            green: "#43B78D"
          }
        },
        stickers: {
          aliceblue: "#E9F3FF",
          sandybrown: "#FDCFA4",
          blanchedalmond: "#F9E9C3",
          cyan: "#AFEBDB",
          limegreen: "#CBF1C2",
          darkpurple: "#CFCEF9",
          lightpurple: "#F9E0FD"
        },
        "test": "red"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
