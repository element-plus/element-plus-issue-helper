import { unref, watch, shallowRef, computed } from 'vue'
import { useFetch } from '@vueuse/core'
import { compare } from 'compare-versions'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'

export const getVersions = (pkg: string) =>
  useFetch(`https://data.jsdelivr.com/v1/package/npm/${pkg}`, {
    initialData: [],
    afterFetch: (ctx) => ((ctx.data = ctx.data.versions), ctx),
  }).json<string[]>().data as Ref<string[]>

export const useSupportedVueVersion = () => {
  const versions = $(getVersions('vue'))
  return computed(() =>
    versions.filter((version) => compare(version, '3.2.0', '>='))
  )
}

export const useSupportedEpVersion = () => {
  const versions = $(getVersions('element-plus'))
  return computed(() =>
    versions.filter((version) => compare(version, '1.1.0-beta.1', '>='))
  )
}

export const useNpmFiles = (
  pkg: MaybeRef<string>,
  version: MaybeRef<string>
) => {
  type Files = {
    hash: string
    name: string
    size: number
    time: string
  }[]
  let files = $(shallowRef<Files>([]))

  const execute = async () => {
    files = await fetch(
      `https://data.jsdelivr.com/v1/package/npm/${unref(pkg)}@${unref(
        version
      )}/flat`
    )
      .then((r) => r.json())
      .then((r) => r.files)
  }

  watch(
    () => [unref(pkg), unref(version)],
    () => {
      if (unref(pkg) && unref(version)) {
        execute()
      }
    },
    { immediate: true }
  )

  return $$(files)
}
