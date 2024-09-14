import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


//用于vant按需引入的导入及解析样式插件 
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //用于vant按需引入的导入及解析样式插件配置
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8081,
    host: '127.0.0.1',
    proxy: {
      '/sendmsg': {
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/sendmsg/, ''),
      }
    },
  }
})
