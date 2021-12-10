import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

let storedLang = $(useLocalStorage('lang', navigator.language))

export const useLanguage = () => {
  const { locale, availableLocales, fallbackLocale, getLocaleMessage } =
    useI18n()

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

  const getLangages = () =>
    availableLocales.map((locale) => ({
      id: locale,
      name: (getLocaleMessage(locale).name as any).source as string,
    }))

  const epLocale = computed(() => (lang.value === 'en' ? en : zhCn))

  if (lang.value !== storedLang) {
    lang.value = storedLang
  }

  return {
    lang,
    epLocale,
    getLangages,
  }
}
