module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        // https://www.colordic.org/colorsample/2375
        bg: "#f8fbf8",
        mono: {
          1: "#323332",
          2: "#656665",
          3: "#979997",
          4: "#fcfffc",
        },
        strongMono: '#d8d8d8',
        accent: {
          green: {
            // https://www.colordic.org/colorsample/7acc7a
            1: "#7acc7a",
            2: "#ccffcc",
            3: "#bee0c2",
            4: "#a7d28d",
          },
          red: {
            1: "#cc7a7a",
          },
          blue: {
            1: "#2a6ad1",
          }
        }
      },
      backgroundImage: {
        hero: "url('/assets/bg-images/hero.jpg')",
      }
    },
  },
  plugins: [],
}
