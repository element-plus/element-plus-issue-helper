<script lang="ts" setup>
import { marked } from 'marked'
import { templateBugReport } from '@/hooks/forms'
import type { Form } from '@/hooks/forms'

const props = defineProps<{
  modelValue: boolean
  form: Form
}>()
defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const { t } = useI18n()

let template = $computed(() => {
  // if (props.form.type === 'bug-report')
  return templateBugReport(props.form)
})
let content = $computed(() =>
  marked(`# ${template.title}\n\n${template.content}`, {
    gfm: true,
    breaks: true,
  })
)

const create = () => {
  const content = encodeURIComponent(template.content)
  window.open(
    `https://github.com/element-plus/element-plus/issues/new?title=${template.title}&body=${content}`
  )
}
</script>

<template>
  <el-dialog
    :title="t('issuePreview')"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="markdown-body text-sm" v-html="content" />

    <template #footer>
      <el-button type="primary" @click="create">{{ t('create') }}</el-button>
    </template>
  </el-dialog>
</template>
