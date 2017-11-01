const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.versions.node': '"6.11.5"',
    }),
  ]
};
