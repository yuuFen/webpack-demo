
// entry: {
//   index:'./src/index.js', 
//   list: './src/list.js', 
//   details: './src/details.js',
// }
// new HtmlWebpackPlugin({
//   template: './src/index.html',
//   filename: 'index.html',
//   chunk: ['index'],
// })

const glob = require('glob')
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//! 多入口配置 统一处理
// 执行构建时，会执行这个文件，
// 动态统一处理就是先遍历文件并处理，动态生成配置，再 export
const setMpa = () => {
  const entry = {}
  const htmlWebpackPlugin = []

  //! 分析入口，规定 src/*/index.js 都是入口文件
  // 遍历文件，得到匹配的文件路径数组
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  // console.log(entryFiles); // 入口文件绝对路径数组
  entryFiles.forEach(((item) => {
    //! 通过正则得到对应的入口名
    const match = item.match(/src\/(.*)\/index\.js/)
    // console.log(match); 
    const entryName = match && match[1];
    entry[entryName] = item

    //! 配置 htmlWebpackPlugin
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: `src/index.html`,
        filename: `${entryName}.html`,
        chunks: [entryName]
      })
    )
  }))
  // console.log(entry);


  return {
    entry,
    htmlWebpackPlugin
  }
}

const { entry, htmlWebpackPlugin } = setMpa()


module.exports = {
  mode: 'development',
  entry,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash:8].js', // filename 带 hash, chunkname 不变
  },
  plugins: [
    ...htmlWebpackPlugin,
    // 清理输出目录 
    new CleanWebpackPlugin(),
  ]
}