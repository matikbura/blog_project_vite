module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {  //配置跨域
            '/api': {
                target: 'http://localhost:8088',  //这里后台的地址模拟的;应该填写你们真实的后台接口
                ws: true,
                changeOrigin: true,  //允许跨域
                pathRewrite: {
                    '^/api': ''  //请求的时候使用这个api就可以
                }
            },
            // 配置跨域
            '/img': {
                target: 'http://120.25.250.33:8080',//后端接口地址
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/img': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('tailwindcss'),
                    require('autoprefixer')
                ]
            }
        }
    }
}
