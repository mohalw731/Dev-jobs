const Minicss = require('mini-css-extract-plugin')

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
  },
  plugins: [
    new Minicss({
      filename:  'main.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },      {
        test: /\.css$/,
        use: [Minicss.loader,'css-loader', "postcss-loader"],
      }
    ],
  },
};
