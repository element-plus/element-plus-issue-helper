import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('../locales/*.y(a)?ml')).map(
    ([key, value]) => {
      const lang = /locales\/(.*)\.ya?ml/.exec(key)?.[1]
      return [lang, value.default]
    }
  )
)

export const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'en',
  messages,
})
