import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

/** 当前执行 node 命令时文件夹的地址（工作目录） */
const root: string = process.cwd()

/** 路径拼接函数，简化代码 */
const pathResolve = (path: string): string => resolve(root, path)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      /** 设置 `@` 指向 `src` 目录 */
      { find: '@', replacement: pathResolve('src') },
      /** 设置 `#` 指向 `types` 目录 */
      { find: '#', replacement: pathResolve('types') },
      // 组件
      { find: '_c', replacement: pathResolve('src/components')},
      // styles
      { find: '_s', replacement: pathResolve('src/styles')}
    ],
  }
})
