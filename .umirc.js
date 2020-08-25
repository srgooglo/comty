import { defineConfig } from 'umi';

const { resolve } = require('path');

export default defineConfig({
  hash: false,
  ignoreMomentLocale: true,
  targets: { ie: 9 },
  dynamicImport: {
    loading: 'components/Loader/Loader.js',
  },
  dva: { immer: true },
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    antd: resolve(__dirname, './node_modules/antd'),
    api: resolve(__dirname, './node_modules/@ragestudio/ycorejs-lib'), // ./api
    globals: resolve(__dirname, './globals'),
    core: resolve(__dirname, './src/core'),
    theme: resolve(__dirname, './src/theme'),
    config: resolve(__dirname, './config'),
    components: resolve(__dirname, './src/components'),
    models: resolve(__dirname, './src/models'),
    routes: resolve(__dirname, './src/routes'),
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
  // plugins: [themePlugin],
  // chainWebpack: function(config, { webpack }) {
  //   config.module
  //     .rule('js-in-node_modules')
  //     .exclude.add(/node_modules/)
  //     .end()

  //   config.module
  //     .rule('ts-in-node_modules')
  //     .exclude.add(/node_modules/)
  //     .end()

  //   config.merge({
  //     optimization: {
  //       minimize: true,
  //       splitChunks: {
  //         chunks: 'all',
  //         minSize: 30000,
  //         minChunks: 3,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           react: {
  //             name: 'react',
  //             priority: 20,
  //             test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/,
  //           },
  //           antd: {
  //             name: 'antd',
  //             priority: 20,
  //             test: /[\\/]node_modules[\\/](antd|@ant-design\/icons)[\\/]/,
  //           },
  //           async: {
  //             chunks: 'async',
  //             minChunks: 2,
  //             name: 'async',
  //             maxInitialRequests: 1,
  //             minSize: 0,
  //             priority: 5,
  //             reuseExistingChunk: true,
  //           },
  //         },
  //       },
  //     },
  //   })
  // },

});
