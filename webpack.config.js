const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackModules = require("webpack-modules");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader"
        }]
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
            { loader: "style-loader"},
            { loader: "css-loader", options: { modules: true, localIdentName:'[local]'} },
            { loader: "sass-loader"},							
        ]
      },   
    ]
  },
  devServer: { port: 4545 },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'iDea',
      template: 'src/index.html',
    }),
    new WebpackModules(),
  ]
};