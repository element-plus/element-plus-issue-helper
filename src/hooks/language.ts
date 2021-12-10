import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

let storedLang = $(useLocalStorage('lang', navigator.language))

export const languages = {
  en: 'English',
  'zh-CN': '简体中文',
}

export const useLanguage = () => {
  const { locale, availableLocales, fallbackLocale } = useI18n()

  const lang = computed({
    get: () =>
      availableLocales.includes(locale.value)
        ? locale.value
        : (fallbackLocale.value as string),
    set: (lang) => {
      const newLang = availableLocales.includes(lang)
        ? lang
        : navigator.language
      locale.value = newLang
      storedLang = newLang
    },
  })

  const epLocale = computed(() => (lang.value === 'en' ? en : zhCn))

  if (lang.value !== storedLang) {
    lang.value = storedLang
  }

  return {
    lang,
    epLocale,
  }
}
