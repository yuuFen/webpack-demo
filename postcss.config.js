// css3 兼容问题

module.exports = {
  plugins: [
    require('autoprefixer')({
      // 兼容最近的两个版本，占有率大于1%的浏览器
      overrideBrowserslist: ['last 2 versions', '>1%']
    })
  ]
}