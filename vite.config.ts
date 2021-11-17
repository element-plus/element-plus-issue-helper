import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inspect from 'vite-plugin-inspect'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import markdown, { Mode } from 'vite-plugin-markdown'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  plugins: [
    vue({
      refTransform: `${pathSrc}/**`,
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    inspect(),
    Unocss({
      presets: [presetUno(), presetIcons()],
    }),
    markdown({ mode: [Mode.HTML, Mode.VUE] }),
  ],
})
