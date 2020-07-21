const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  // 生成转换后代码到原始代码的映射，用于开发环境，详情见官网
  // https://webpack.docschina.org/configuration/devtool/#%E5%AF%B9%E4%BA%8E%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83
  devtool: 'source-map',
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
          // {
          //   loader: 'style-loader',
          //   options: {
          //     injectType: 'singletonStyleTag' // 合成为单个 style
          //   }
          // },
          MiniCssExtractPlugin.loader,
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
  ]
}