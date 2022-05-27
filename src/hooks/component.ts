import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'

export const useComponentList = (
  epVersions: Ref<string[]>,
  epVersion?: MaybeRef<string>
) => {
  const files = $(
    useNpmFiles(
      'element-plus',
      computed(() => unref(epVersion) || epVersions.value[0])
    )
  )
  const components = $computed(() => [
    ...new Set(
      files
        .map((file) => /\/es\/components\/(.*?)\/.*$/.exec(file.name)?.[1])
        .filter((name): name is string => !!name)
        .map((name) => `el-${name}`)
    ),
  ])

  return $$(components)
}
