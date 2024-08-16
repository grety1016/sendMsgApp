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
  server:{
    port:80,
    host:'192.168.0.31',
    // host:'192.168.2.6',
    proxy:{
      '/sendmsg':{
        target:'http://210ie6ur7254.vicp.fun:23736/',
        changeOrigin:true,
        rewrite:path => path.replace(/^\/sendmsg/,''),
      }
    },
  }
})
