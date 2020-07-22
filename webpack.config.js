const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  // 生成转换后代码到原始代码的映射，用于开发环境，详情见官网
  // https://webpack.docschina.org/configuration/devtool/#%E5%AF%B9%E4%BA%8E%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83
  devtool: 'source-map',
  // 配置 webpack-dev-server
  // 打包后保存至内存中 
  devServer: {
    open: true,
    port: 8081,
    contentBase: './dist',
    // 不自动刷新浏览器，只使用热更新
    // 配合 HotModuleReplacementPlugin 保留状态，模块化刷新
    hotOnly: true,
    // 本地代理
    proxy: {
      // 匹配
      '/api': {
        target: 'http://localhost:9092'
      }
    }
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
  },
  // webpack 默认只支持 js/json，如果需要导入其他类型的文件，需要额外配置 loader
  // 用于加载文件
  module: {
    rules: [
      // 打包图片
      {
        test: /\.(png|jpe?g|gif)$/,
        // use: ['file-loader']
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'images/'
          }
        }]
      },
      // 字体文件
      {
        test: /\.woff$/,
        use: ['file-loader']
      },
      // css-loader 负责读取 css，通过 css in js 传给 下给步
      // style-loader 负责生成将 css 放进 head 中 style 标签的 js 代码
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag' // 合成为单个 style
            }
          },
          // MiniCssExtractPlugin.loader,
          'css-loader',
        ], // 从右往左执行
      },
      // less-loader 将 less 解析成 css 传给下一步
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     injectType: 'singletonStyleTag'
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // 扩展当前 css：为 css3 属性加上前缀
          'less-loader',
        ]
      }
    ]
  },
  // 插件可以作用于 webpack 整个构建的生命周期
  // 每个插件作用于固定的阶段
  plugins: [
    // 自动生成 html 模板
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    // 清理输出目录 
    new CleanWebpackPlugin(),
    // 将 css 打包为一个独立的文件
    // 使用这个需要另外配置 module
    // 使用 MiniCssExtractPlugin.loader 代替 style-loader
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css'
    }),
    //! 热模块替换
    // 保留状态，只更新改变的模块
    //! HMR 只支持 style-loader，不支持抽离成独立文件引入的 css
    //! 对于 js 模块的 HMR，需要在对应代码中手动设置监听某一模块，当那个模块的内容改变，会触发回调
    // 原理：给每个模块赋了一个 id，当某模块发生改变时，通过 id 删除该模块，再重新生成
    // React Hot Loader / Vue Loader / ...
    new webpack.HotModuleReplacementPlugin()
  ]
}