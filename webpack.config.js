const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackModules = require("webpack-modules");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ZipFilesPlugin = require('webpack-zip-files-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
    new CleanWebpackPlugin(),
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
  devServer: { 
    port: 4545,
    clientLogLevel: 'none',
  },
};


/*

      <ThreeArea canvasClasses={['medium-3d', 'p1']} add3DContent={turnContent(GEOMS.tetrahedron, 200)}/>
      <ThreeArea canvasClasses={['medium-3d', 'p2']} add3DContent={turnContent(GEOMS.dedocahedron, 200)}/>
      <ThreeArea canvasClasses={['medium-3d', 'p3']} add3DContent={turnContent(GEOMS.box, 200, 200, 200)}/>
      <ThreeArea canvasClasses={['medium-3d', 'p4']} add3DContent={turnContent(GEOMS.cone, 200)}/>
      <ThreeArea canvasClasses={['medium-3d', 'p5']} add3DContent={turnContent(GEOMS.icosahedron, 200)}/>
      <ThreeArea canvasClasses={['medium-3d', 'p6']} add3DContent={turnContent(GEOMS.octahedron, 200)}/>
      <ThreeArea canvasClasses={['medium-3d', 'p7']} add3DContent={turnContent(GEOMS.box, 5, 300, 300)}/>

*/