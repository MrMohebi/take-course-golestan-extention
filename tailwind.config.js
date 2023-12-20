// npx tailwindcss -i ./src/css/tailwindInp.css -o ./src/libs/tailwindcss.css --watch


module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "primary":"#2684FF",
        "primary-light":"#229ED9",
      }
    },
  },
  plugins: [],
}

