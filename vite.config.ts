import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base:'./',
    plugins: [vue()],
    resolve: {
        extensions: ['.ts', '.vue', '.json','.js'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            views: path.resolve(__dirname, './src/views'),
            components: path.resolve(__dirname, './src/components'),
            utils: path.resolve(__dirname, './src/utils'),
            assets: path.resolve(__dirname, "./src/assets"),
            com: path.resolve(__dirname, "./src/components"),
            store: path.resolve(__dirname, "./src/store"),
        },
    },
    server: {
        // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
        host: '0.0.0.0',
        https: false,
        port:9999, // 服务器端口号
        open: false, // 是否自动打开浏览器
        // 代理
        proxy: {
            '/api': {
                target: 'http://localhost:8088',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/img': {
                target: 'http://120.25.250.33:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/img/, '')
            }
        }
    }
})