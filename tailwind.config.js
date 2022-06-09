module.exports = {
  mode:'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'banner': "url('src/assets/logos/222.png')",
      }, gridTemplateRows: {
        '40/60': '40vh 60vh'
      },
      width: {
        '18': '280px',
      },
      gridTemplateColumns: {
        '20-30x2': '20% repeat(2, 37%)',
        'abc': '3fr 1fr 1fr 2fr 2fr',
        'certificadosGrid': '2fr 1fr 2fr'

      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],


}
