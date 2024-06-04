import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gradient:
          "radial-gradient(circle at 28% 51%, rgba(206, 206, 206,0.03) 0%, rgba(206, 206, 206,0.03) 17%,transparent 17%, transparent 100%),radial-gradient(circle at 45% 10%, rgba(10, 10, 10,0.03) 0%, rgba(10, 10, 10,0.03) 45%,transparent 45%, transparent 100%),radial-gradient(circle at 48% 44%, rgba(74, 74, 74,0.03) 0%, rgba(74, 74, 74,0.03) 84%,transparent 84%, transparent 100%),radial-gradient(circle at 47% 50%, rgba(186, 186, 186,0.03) 0%, rgba(186, 186, 186,0.03) 23%,transparent 23%, transparent 100%),radial-gradient(circle at 29% 70%, rgba(9, 9, 9,0.03) 0%, rgba(9, 9, 9,0.03) 32%,transparent 32%, transparent 100%),radial-gradient(circle at 2% 75%, rgba(179, 179, 179,0.03) 0%, rgba(179, 179, 179,0.03) 19%,transparent 19%, transparent 100%),radial-gradient(circle at 2% 36%, rgba(26, 26, 26,0.03) 0%, rgba(26, 26, 26,0.03) 1%,transparent 1%, transparent 100%),radial-gradient(circle at 53% 70%, rgba(90, 90, 90,0.03) 0%, rgba(90, 90, 90,0.03) 55%,transparent 55%, transparent 100%),radial-gradient(circle at 28% 92%, rgba(31, 31, 31,0.03) 0%, rgba(31, 31, 31,0.03) 35%,transparent 35%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));",
      },
      colors: {
        "sih-grey": "#e8e8e8",
        "sih-blue": "#384B59",
        "sih-orange": "#FFBD5C",
        "sih-red": "#AA4039",
        "sih-green": "#39AA4A",
      },
      boxShadow: {
        button: "-8px 9px 14px 0px rgba(0,0,0,0.49);",
      },
      screens: {
        cellphone: "560px",
        large: "1800px",
        medium: "1330px",
        xs: "455px",
      },
    },
  },
  plugins: [],
};
export default config;
