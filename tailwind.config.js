module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "black-300": "#1E2127",
      "black-400": "#181A20",
      "black-500": "#14161B",
      "gray-400": "#616D85",
      "white-100": "#FFFFFF",
      "white-200": "#F5F6FF",
      "primary-300": "#8F95EB",
      "primary-400": "#7F86E8",
      "primary-500": "#5962E1",
      "secondary-300": "#FFE06E",
      "secondary-300": "#FFDB59",
      "secondary-300": "#FFD22E",
    },
    fontFamily: {
      sans: ["Exo 2", "sans-serif"],
    },
    container: {
      center: true,
      screens: {
        xl: "1762px",
        lg: "1762px",
        md: "900px",
        sm: "600px",
        xs: "360px",
      },
    },
  },
  plugins: [],
};
