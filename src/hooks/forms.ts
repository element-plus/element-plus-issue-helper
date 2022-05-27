import type { Rule } from 'async-validator'

export const buildTools = [
  'Vite',
  'Webpack',
  'Vue CLI',
  'Rollup',
  'esbuild',
  'Nuxt',
  'CDN',
  'Other',
] as const

export const bugTypes = [
  'Component',
  'TypeScript',
  'Style',
  'i18n',
  'Build',
  'Performance',
  'Docs',
  'Other',
] as const

export const featureTypes = [
  'New Component',
  'Enhancement',
  'TypeScript',
  'i18n',
  'Docs',
  'Other',
] as const

export interface Form {
  type: 'bug-report' | 'feature-request'
  title: string
  additional: string
  bugReport: FormBugReport
  featureRequest: FormFeatureRequest
}

export interface FormBugReport {
  epVersion: string
  vueVersion: string
  browser: string
  buildTool: '' | typeof buildTools[number]
  bugType: '' | typeof bugTypes[number]
  components: string[]
  reproductionLink: string
  reproduce: string
  expected: string
  actual: string
}

export interface FormFeatureRequest {
  featureType: '' | typeof featureTypes[number]
  newComponentName: string
  enhancedComponentName: string
  description: string
}

export const removeComponentPrefix = (name: string) => name.replace(/^el-/, '')

export const useForm = () => {
  const defaultForm: Form = {
    type: 'bug-report',
    title: '',
    additional: '',
    bugReport: {
      epVersion: '',
      vueVersion: '',
      browser: '',
      buildTool: '',
      bugType: '',
      components: [],
      reproductionLink: '',
      reproduce: '',
      expected: '',
      actual: '',
    },
    featureRequest: {
      featureType: '',
      newComponentName: '',
      enhancedComponentName: '',
      description: '',
    },
  }
  let form = $(useLocalStorage('issue', defaultForm))

  const rules: Record<string, Rule> = {
    'bugReport.reproductionLink': [
      {
        validator: (field, value: string) => {
          if (value.startsWith('!')) return true
          return checkReproductionLink(value)
        },
      },
    ],
  }

  const reset = () => (form = defaultForm)

  return $$({
    form,
    rules,
    reset,
  })
}
