import { pages } from './src/pages'

const config = {
  favicons: {
    appName: 'tools',
    appDescription: "Shu's front-end tools ",
    developerName: 'xiaoshu',
    developerURL: null, // prevent retrieving from the nearest package.json
    background: '#ddd',
    theme_color: '#333',
    icons: {
      coast: false,
      yandex: false,
    },
  },
  pages,
  publicPath: '/',
}

export default config
