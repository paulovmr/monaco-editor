const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: './standalone.js',
  output: {
    filename: 'monaco.min.js',
    path: path.resolve(__dirname, 'dist/standalone'),
    libraryTarget: 'umd',
    library: 'monaco'
  },
  resolveLoader: {
    alias: {
      'blob-url-loader': require.resolve('./loaders/blobUrl'),
      'compile-loader': require.resolve('./loaders/compile')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(
      /^((fs)|(path)|(os)|(crypto)|(source-map-support))$/,
      /vs\/language\/typescript\/lib/
    ),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}
