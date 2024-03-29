import { camelize, capitalize } from 'vue'
import type { Form } from './forms'

export const templateBugReport = (form: Form) => {
  const { t } = useI18n()

  const titleTags = []
  if (form.bugReport.bugType !== 'Other') titleTags.push(form.bugReport.bugType)
  if (
    form.bugReport.components.length <= 2 &&
    !form.bugReport.components.includes('N/A')
  )
    titleTags.push(
      form.bugReport.components
        .map((component) => removeComponentPrefix(component))
        .join(', ')
    )

  const linkName =
    resolveReproductionLink(form.bugReport.reproductionLink)?.name ?? 'Link'
  const link = removeReproductionPrefix(form.bugReport.reproductionLink)
  const title = `${titleTags.map((tag) => `[${tag}]`).join(' ')} ${form.title}`
  const content = `
<!-- generated by https://issue.element-plus.org/ DO NOT REMOVE -->

Bug Type: **\`${form.bugReport.bugType}\`**

## Environment

- Vue Version: \`${form.bugReport.vueVersion}\`
- Element Plus Version: \`${form.bugReport.epVersion}\`
- Browser / OS: \`${form.bugReport.browser}\`
- Build Tool: \`${form.bugReport.buildTool}\`

## Reproduction

### Related Component

${form.bugReport.components.map((component) => `- \`${component}\``).join('\n')}

### Reproduction Link

[${linkName}](${link})

### Steps to reproduce

${form.bugReport.reproduce}

### What is Expected?

${form.bugReport.expected}

### What is actually happening?

${form.bugReport.actual}

### Additional comments

${form.additional || '_(empty)_'}

<!-- ${t('screenshot')} -->
`.trim()

  const labels = [
    'Community::Bug Report',
    ...form.bugReport.components.map(
      (comp) => `Component::${capitalize(camelize(comp.replace(/^el-/, '')))}`
    ),
  ]

  return {
    title,
    content,
    labels,
  }
}

export const templateFeatureRequest = (form: Form) => {
  const { t } = useI18n()

  const titleTags = []

  if (form.featureRequest.featureType !== 'Other')
    titleTags.push(form.featureRequest.featureType)

  const componentName =
    form.featureRequest[
      form.featureRequest.featureType === 'New Component'
        ? 'newComponentName'
        : 'enhancedComponentName'
    ]
  if (!['All', 'N/A'].includes(componentName))
    titleTags.push(removeComponentPrefix(componentName))

  const details: string[][] = []

  if (form.featureRequest.featureType === 'New Component') {
    if (form.featureRequest.newComponentName)
      details.push(['New component name', form.featureRequest.newComponentName])
  } else if (form.featureRequest.enhancedComponentName) {
    details.push([
      'Enhanced component name',
      removeComponentPrefix(form.featureRequest.enhancedComponentName),
    ])
  }

  const title = `${titleTags.map((tag) => `[${tag}]`).join(' ')} ${form.title}`
  const content = `
<!--
${t('feature.poll-tips')}
-->
Feature type: **\`${form.featureRequest.featureType}\`**

## Details

${details.map(([title, value]) => `- ${title}: \`${value}\``).join('\n')}

## Description

${form.featureRequest.description}

### Additional comments

${form.additional || '_(empty)_'}

<!-- ${t('screenshot')} -->

`.trim()

  const labels = ['Community::Feature Request']

  return {
    title,
    content,
    labels,
  }
}
