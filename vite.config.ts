import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inspect from 'vite-plugin-inspect'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import md, { Mode } from 'vite-plugin-markdown'
import { markdownIt } from './build/markdown'
import pkg from './package.json'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${pathSrc}/`,
    },
  },
  define: {
    'import.meta.env.VERSION': JSON.stringify(pkg.version),
  },
  plugins: [
    vue({
      refTransform: `${pathSrc}/**`,
      script: {
        propsDestructureTransform: true,
      },
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    inspect(),
    Unocss({
      presets: [presetUno(), presetIcons()],
    }),
    md({
      mode: [Mode.HTML, Mode.VUE],
      markdownIt,
    }),
  ],
})
