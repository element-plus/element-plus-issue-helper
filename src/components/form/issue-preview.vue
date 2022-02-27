<script lang="ts" setup>
import { marked } from 'marked'
import { templateBugReport, templateFeatureRequest } from '@/hooks/forms'
import type { Form } from '@/hooks/forms'

const props = defineProps<{
  modelValue: boolean
  form: Form
}>()
defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const { t } = useI18n()

const template = $computed(() => {
  switch (props.form.type) {
    case 'bug-report':
      return templateBugReport(props.form)
    case 'feature-request':
      return templateFeatureRequest(props.form)
  }
})
const content = $computed(() =>
  marked(`# ${template.title}\n\n${template.content}`, {
    gfm: true,
    breaks: true,
  })
)

const create = () => {
  window.open(
    `https://github.com/element-plus/element-plus/issues/new?title=${encodeURIComponent(
      template.title
    )}&body=${encodeURIComponent(template.content)}`
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
