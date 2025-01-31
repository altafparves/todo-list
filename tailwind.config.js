/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        // Custom font sizes and line-height configurations
        "page-title": ["40px", { fontWeight: "700" }],
        "26-700": ["26px", { fontWeight: "700" }],
        "task-title": ["17px", { fontWeight: "700" }],
        "task-note": ["15px", { fontWeight: "400" }],
        "16-700": ["16px", { fontWeight: "700" }],
        "16-500": ["16px", { fontWeight: "500" }],
        "14-700": ["14px", { fontWeight: "700" }],
        "14-500": ["14px", { fontWeight: "500" }],
        "14-400": ["14px", { fontWeight: "400" }],
        "12-500": ["12px", { fontWeight: "500" }],
        "12-400": ["12px", { fontWeight: "400" }],
      },
      colors: {
        base: "#1C1C1E",
        secondary: "#202020",
        button: "#2C2C2C",
        text: "#FFFFFA",
        "secondary-text": "#CECACB",
        grey: "#828282",
        blue: "#1660F6",
        red: "#E1251A",
        yellow: "#FFD643",
      },
    },
  },
  plugins: [],
};

