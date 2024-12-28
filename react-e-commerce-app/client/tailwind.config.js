/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
        inter: ['"Inter 18pt"', "sans-serif"],
      },
      colors: {
        mesblack: "#121212",
        mesgray: "#F5F5F5",
        lifblue: "#3E3E59",
      },
      screens: {
        xs: "375px",
        sm: "425px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "26px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["32px", "40px"],
        "4xl": ["40px", "48px"],
        "5xl": ["48px", "56px"],
      },
    },
  },
  plugins: [],
};
