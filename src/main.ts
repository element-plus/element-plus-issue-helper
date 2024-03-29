import { createApp } from 'vue'
import App from '@/app.vue'
import { i18n } from './i18n'
import 'uno.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App).use(i18n).mount('#app')
