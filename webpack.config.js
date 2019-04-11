const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackModules = require("webpack-modules");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ZipFilesPlugin = require('webpack-zip-files-plugin');

const config = {
  APP_NAME: 'iDea',
  SHORT_NAME: 'iDea',
  PWA_ICON: 'pwa-icon-idea.png',
  projectDescription: 'Geometriai feladványokkal tűzdelt játékos applikáció a Platón barlangjában.',
}

const manifestData = {
  background_color: "#030303",
  display: "fullscreen",
  orientation: "portrait",
}
	
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
    new CopyWebpackPlugin(
      [
        {from: './assets/', to: './'},
      ], {copyUnmodified: false}
    ),
    new HtmlWebPackPlugin({
      title: 'iDea',
      template: 'src/index.html',
    }),
    new WebpackModules(),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      fingerprints: true,
      name: config.APP_NAME,
      short_name: config.SHORT_NAME,
      description: config.projectDescription,
      background_color: manifestData.background_color,
      display: manifestData.display,
      orientation: manifestData.orientation,
      theme_color: manifestData.background_color,
      'theme-color': manifestData.background_color,
      start_url: './index.html',
      /*
      icons: [
        {
          src: './img/_icons/' + config.PWA_ICON,
          sizes: [96, 128, 192, 256, 384, 512],
        }
      ]
      */
    }),	
  ]
};
