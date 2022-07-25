module.exports = {
  plugins: {
    'postcss-pxtorem': {
      //设计稿1rem 大小,vant组件库的是根据37.5.
      //   如何动态设置rootValue，二倍图、下面的
      //   rootValue: 37.5,
      rootValue: (module) =>
        /(vant|markdown)/gi.test(module.file) ? 37.5 : 75,
      //   适配的属性，全部的话设置为*
      propList: ['*']
    }
  }
}
