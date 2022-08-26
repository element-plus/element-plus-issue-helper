import { camelize, capitalize } from 'vue'
import type { Component } from 'vue'

export const useTexts = () => {
  const { lang } = $(useLanguage())
  const prefix = $computed(() => `../texts/${lang}/`)

  const texts = reactiveComputed<Record<string, Component>>(() =>
    Object.fromEntries(
      Object.entries(import.meta.glob('../texts/**', { eager: true }))
        .filter(([key]) => key.startsWith(prefix))
        .map(([key, value]) => [
          capitalize(camelize(key.replace(prefix, '').replace('.md', ''))),
          markRaw((value as any).default),
        ])
    )
  )
  return texts
}
