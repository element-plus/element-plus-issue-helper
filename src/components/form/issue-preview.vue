<script lang="ts" setup>
import { marked } from 'marked'
import newGithubIssueUrl from 'new-github-issue-url'
import { templateBugReport, templateFeatureRequest } from '@/hooks/template'
import type { Form } from '@/hooks/forms'

const { modelValue, form } = defineProps<{
  modelValue: boolean
  form: Form
}>()
defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const { t } = useI18n()

const template = $computed(() => {
  switch (form.type) {
    case 'bug-report':
      return templateBugReport(form)
    case 'feature-request':
      return templateFeatureRequest(form)
  }
})
const content = $computed(() =>
  marked(`# ${template.title}\n\n${template.content}`, {
    gfm: true,
    breaks: true,
  })
)

const create = () => {
  let url: string
  if (form.type === 'bug-report') {
    url = newGithubIssueUrl({
      user: 'element-plus',
      repo: 'element-plus',
      title: template.title,
      body: template.content,
      labels: template.labels,
    })
  } else {
    const params = new URLSearchParams({
      category: 'feature-request',
      title: template.title,
      body: template.content,
      labels: template.labels.join(','),
    })
    url = `https://github.com/element-plus/element-plus/discussions/new?${params.toString()}`
  }
  window.open(url)
}
</script>

<template>
  <el-dialog
    :title="t('issuePreview')"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="markdown-body" text-sm v-html="content" />

    <template #footer>
      <el-button type="primary" @click="create">{{ t('create') }}</el-button>
    </template>
  </el-dialog>
</template>
