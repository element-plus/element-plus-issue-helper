import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
  Object.entries(import.meta.glob('../locales/*.y(a)?ml', { eager: true })).map(
    ([key, value]) => {
      const lang = /locales\/(.*)\.ya?ml/.exec(key)?.[1]
      return [lang, (value as any).default]
    }
  )
)

export const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'en',
  messages,
})
