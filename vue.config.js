const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
// cdn预加载使用
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios'
};
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://lib.baomitu.com/vue/2.6.6/vue.min.js',
      'https://lib.baomitu.com/vue-router/3.0.1/vue-router.min.js',
      'https://lib.baomitu.com/vuex/3.0.1/vuex.min.js',
      'https://lib.baomitu.com/axios/0.18.0/axios.min.js'
    ]
  }
};

module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: true,
  configureWebpack: config => {
    // ts转换
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        appendTsSuffixTo: [/\.vue$/],
      }
    });
    if (isProduction) {
      // externals里的模块不打包
      Object.assign(config, {
        externals: externals
      });

      // 上线压缩去除console等信息
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      // 前端错误log配置
      config.plugins.push(
        new SentryCliPlugin({
          include: './dist/js', //作用的文件夹，如果只想js报错就./dist/js
          release: process.env.VUE_APP_RELEASE_VERSION, //一致的版本号
          configFile: 'sentry.properties', //不用改
          ignore: ['node_modules', 'webpack.config.js', 'dist.zip'],
          urlPrefix: '~/', //这里指的你项目需要观测的文件如果你的项目有publicPath这里加上就对了
        })
      );

      // 开启gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );

      // 移除编译后的.map文件
      config.plugins.push(
        new ZipPlugin({
          path: path.join(__dirname, 'dist'),
          filename: 'dist.zip',
          exclude: [/\.map$/] //排除.map文件
        })
      );
    }
  },
  chainWebpack: config => {
    // 对vue-cli内部的 webpack 配置进行更细粒度的修改。
    // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
    config.plugin('html').tap(args => {
      if (isProduction) {
        args[0].cdn = cdn.build;
      } else {
        args[0].cdn = cdn.dev;
      }
      return args;
    });
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProduction ? true : false, // css拆分ExtractTextPlugin插件，默认true - 骨架屏需要为true
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        //这个是加上自己的路径，
        //注意：试过不能使用别名路径
        path.resolve(__dirname, './src/assets/less/variables.less'),
      ]
    }
  },

  devServer: {
    port: 8081, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    compress: true, // 开启压缩
    proxy: {
      '/shop': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/shop': '/shop'
        }
      }
    },
  }
};