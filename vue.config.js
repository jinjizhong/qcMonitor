module.exports = {
  publicPath: '/ana_home/', // 此处改为 './' 即可，打包发布 /ana_home/
  devServer: {
    port: 8088, // 端口号配置
    /* 跨越解决 */
    // proxy: {
    //   // proxy all requests starting with /api to jsonplaceholder
    //   '/api': {
    //     target: 'https://e.intellqc.com/__sys/WebApiUser', // 目标地址
    //     changeOrigin: true // 设置同源  默认false，是否需要改变原始主机头为目标URL
    //     // pathRewrite: {
    //     //   '^/api': '/__sys/WebApiUser/api' //代理的路径
    //     // }
    //   },
    //   '/webApi': {
    //     target: 'https://e.intellqc.com', // 目标地址
    //     changeOrigin: true, // 设置同源  默认false，是否需要改变原始主机头为目标URL
    //     pathRewrite: {
    //       '^/webApi': '/__sys/api/api/web' //代理的路径
    //     }
    //   }
    // },
    // disableHostCheck: true
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `
  //         @import "@/assets/style/_variable.scss";
  //       `
  //     }
  //   }
  // },
  // 懒加载
  chainWebpack: config => {
    // 移除 prefetch 插件
    // config.plugins.delete('prefetch')

    // 或者
    // 修改它的选项：
    config.plugin('prefetch').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || []
      options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      return options
    })
  },
  configureWebpack: {
    externals: {
      AMap: 'AMap' // 高德地图配置
    }
  }
}