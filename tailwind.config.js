/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        // Custom font sizes and line-height configurations
        "26-700": ["26px", { fontWeight: "700" }],
        "14-700": ["14px", { fontWeight: "700" }],
        "14-500": ["14px", { fontWeight: "500" }],
        "14-400": ["14px", { fontWeight: "400" }],
        "11-400": ["12px", { fontWeight: "400" }],
      },
      colors: {
        base: "#ffffff",
        secondary: "#F4f4f4f4",
        black: "#000",
        grey: "#828282",
      },
    },
  },
  plugins: [],
};

