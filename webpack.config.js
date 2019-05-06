const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackModules = require("webpack-modules");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ZipFilesPlugin = require('webpack-zip-files-plugin');
const version = require('./version');
const path = require('path');

const config = {
  APP_NAME: 'iDea',
  SHORT_NAME: 'iDea',
  BASE_URL: '',
  PWA_ICON: 'pwa-icon-idea.png',
  projectDescription: 'Geometriai feladványokkal tűzdelt játékos applikáció a Platón barlangjában.',
}

const manifestData = {
  background_color: "#030303",
  display: "fullscreen",
  orientation: "portrait",
}
	
module.exports = { 
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'idea.js'
  },

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

  plugins: [
    new CopyWebpackPlugin(
      [
        {from: './assets/', to: './'},
      ], {copyUnmodified: false}
    ),
    new SWPrecacheWebpackPlugin({
      cacheId: version,
      filename: 'service-worker.js',
      staticFileGlobs: [
        '/assets/**.*',
      ],
      stripPrefix: '/assets/', // stripPrefixMulti is also supported
      mergeStaticsConfig: true, // if you don't set this to true, you won't see any webpack-emitted assets in your serviceworker config
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    }),		    
    new HtmlWebPackPlugin({
      filename: 'app.html',
      template: 'src/app.html',
      inject: true,
      appMountId: 'app',
    }),
    new HtmlWebPackPlugin({
      title: config.APP_NAME,
      mobile: true,
      favicon: './favicon.ico',
      template: './src/index.html',
      inject: false,
      baseUrl: config.BASE_URL,
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
      icons: [
        {
          src: path.resolve('./assets/img/icons/' + config.PWA_ICON),
          sizes: [96, 128, 192, 256, 384, 512],
        }
      ]
    }),	
  ],
  devServer: { port: 4545 },
};
