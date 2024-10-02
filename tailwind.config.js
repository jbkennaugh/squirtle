/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mpprimary: "#aec4d4",
        mpprimarydark: "#57626a",
        mpsecondary: "#112544",
        destructive: "#ff0000",
      },
    },
  },
  plugins: [],
};
