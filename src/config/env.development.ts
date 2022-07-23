// 本地环境配置
module.exports = {
  env: 'development',
  mock: true,
  title: '开发',
  baseUrl: 'http://localhost:8082', // 项目地址
  baseApi: 'http://localhost:8080/api', // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
  APPID: 'wx9790364d20b47d95',
  APPSECRET: 'xxx',
  $cdn: 'https://imgs.solui.cn'
}
