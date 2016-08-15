module.exports = {
  entry: './src/site/entry.js',
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
    ],
  },
};
