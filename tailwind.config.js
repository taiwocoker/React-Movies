module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#d5137c",
        black: "#1b1717",
        "primary-faded": "#d5137c59",
      },
    },
  },
  variants: {},
  plugins: [],
};
