import { useUrlSearchParams } from '@vueuse/core'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

export const languages = [
  { id: 'en-US', text: 'English', locale: en },
  { id: 'zh-CN', text: '中文', locale: zhCn },
]

const params = useUrlSearchParams('hash-params')

export const useLanguage = () => {
  const getLanguage = (id: string) =>
    languages.find((language) => language.id === id)!

  // eslint-disable-next-line prefer-const
  let lang = $computed({
    get: () => {
      let id = `${params.lang || window.navigator.language}`
      if (!getLanguage(id)) id = 'en-US'
      return id
    },
    set: (val) => (params.lang = val),
  })
  // eslint-disable-next-line prefer-const
  let language = $computed(() => getLanguage(lang))

  return $$({
    lang,
    language,
    getLanguage,
  })
}
