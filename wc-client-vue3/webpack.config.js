// Inside of webpack.config.js:
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new InjectManifest({ // Only include HTML and JS assets when precaching:
      include: [/\.html$/, /\.css$/, /\.js$/]
    })
  ]
}
