module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        // https://www.colordic.org/colorsample/2375
        base: "#f8fbf8",
        mono: {
          1: "#323332",
          2: "#656665",
          3: "#979997",
          4: "#fcfffc",
        },
        accent: {
          green: {
            // https://www.colordic.org/colorsample/7acc7a
            1: "#7acc7a",
            2: "#ccffcc",
          },
          red: {
            1: "#cc7a7a",
          }
        }
      }
    },
  },
  plugins: [],
}
