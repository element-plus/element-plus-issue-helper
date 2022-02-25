import { camelize, capitalize } from '@vue/shared'
import { useLanguage } from '@/hooks/language'
import type { Component } from 'vue'

export const useTexts = () => {
  const { lang } = $(useLanguage())
  const prefix = $computed(() => `../texts/${lang}/`)

  const texts = $computed<Record<string, Component>>(() =>
    Object.fromEntries(
      Object.entries(import.meta.globEager('../texts/**'))
        .filter(([key]) => key.startsWith(prefix))
        .map(([key, value]) => [
          capitalize(camelize(key.replace(prefix, '').replace('.md', ''))),
          markRaw(value.default),
        ])
    )
  )
  return Object.fromEntries(
    Object.keys(texts).map((key) => {
      return [key, computed(() => texts[key])]
    })
  )
}
