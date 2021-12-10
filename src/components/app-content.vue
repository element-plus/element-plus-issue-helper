<script setup lang="ts">
import { camelize, capitalize } from '@vue/shared'
import { useLanguage } from '@/hooks/language'
import { getSupportedEpVersion, getSupportedVueVersion } from '@/utils'
import { useForm, buildTools, bugTypes } from '../hooks/forms'
import IssuePreview from './issue-preview.vue'
import type { Component } from 'vue'

const { t } = useI18n()
let { lang } = $(useLanguage())

let texts = $computed<Record<string, Component>>(() => {
  const prefix = `../texts/${lang}/`
  return Object.fromEntries(
    Object.entries(import.meta.globEager('../texts/**'))
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => [
        capitalize(camelize(key.replace(prefix, '').replace('.md', ''))),
        markRaw(value.default),
      ])
  )
})
const { BeforeYouStart, ReproductionLink, MarkdownSupported } =
  Object.fromEntries(
    Object.entries(texts).map(([key]) => [key, computed(() => texts[key])])
  )

const userAgent = navigator.userAgent
const epVersions = getSupportedEpVersion()
const vueVersions = getSupportedVueVersion()

let preview = $ref(false)
let componentsLimit = $ref(5)

const handlePreview = async () => {
  await form$.validate()
  preview = true
}

let { form$, form, rules, components, reset } = $(useForm(epVersions))

watch(
  () => form.components,
  (components) => {
    if (components.includes('All') || components.includes('N/A')) {
      if (components.length > 1) {
        form.components = [components.includes('All') ? 'All' : 'N/A']
      }
      componentsLimit = 1
    } else {
      componentsLimit = 5
    }
  }
)
</script>

<template>
  <el-row class="content" justify="center">
    <el-col :xs="18" :sm="18" :md="12">
      <div class="bg-#ecf5ff rounded-lg my-4 p-4">
        <h1 class="my-1 fw-400">{{ t('beforeYouStart') }}</h1>
        <p class="leading-6">
          <BeforeYouStart />
        </p>
        <a class="text-base" tabindex="-1">{{ t('whyStrict') }} (WIP)</a>
      </div>

      <el-form
        ref="form$"
        :model="form"
        :rules="rules"
        size="small"
        label-position="top"
      >
        <el-form-item :label="t('issueType')" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio-button label="bug-report">
              {{ t('issueTypeBugReport') }}
            </el-radio-button>
            <el-radio-button label="feature-request" disabled>
              {{ t('issueTypeFeatureRequest') }} (WIP)
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="t('issueTitle')" prop="title" required>
          <el-input v-model="form.title" />
        </el-form-item>

        <el-form-item :label="t('bug.type')" required>
          <el-select v-model="form.bugType" clearable>
            <el-option
              v-for="bugType in bugTypes"
              :key="bugType"
              :value="bugType"
              :label="bugType"
            />
          </el-select>
        </el-form-item>

        <h2 class="sub-title">{{ t('bug.enviroment') }}</h2>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item
              :label="t('bug.elementPlusVersion')"
              prop="epVersion"
              required
            >
              <el-select v-model="form.epVersion" clearable style="width: 100%">
                <el-option
                  v-for="version in epVersions"
                  :key="version"
                  :value="version"
                  >{{ version }}</el-option
                >
              </el-select>

              <p class="text-sm text-gray-500">
                {{ t('bug.elementPlusVersionHint') }}
              </p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="t('bug.vueVersion')"
              prop="vueVersion"
              required
            >
              <el-select
                v-model="form.vueVersion"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="version in vueVersions"
                  :key="version"
                  :value="version"
                >
                  {{ version }}
                </el-option>
              </el-select>
              <p class="text-sm text-gray-500">
                {{ t('bug.vueVersionHint') }}
              </p>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="t('bug.browserOS')" prop="browser" required>
              <el-input
                v-model="form.browser"
                placeholder="e.g. Chrome 96.0.4664.45 / macOS 12.0.1"
              />

              <p class="text-xs text-gray-500 font-mono">
                UserAgent: {{ userAgent }}
              </p>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="t('bug.buildTool')" prop="buildTool" required>
              <el-radio-group v-model="form.buildTool">
                <el-radio v-for="name in buildTools" :key="name" :label="name">
                  {{ name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <h2 class="sub-title">{{ t('bug.reproduction') }}</h2>

        <el-form-item
          :label="t('bug.affectedComponents')"
          prop="components"
          required
        >
          <el-select
            v-model="form.components"
            multiple
            filterable
            :multiple-limit="componentsLimit"
            style="width: 100%"
          >
            <el-option
              v-for="component in ['All', 'N/A', ...components]"
              :key="component"
              :label="component"
              :value="component"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :label="t('bug.minimalReproduction')"
          prop="reproductionLink"
          required
        >
          <el-input v-model="form.reproductionLink" />
          <reproduction-link />
        </el-form-item>

        <div class="bg-#fdf6ec rounded-lg mt-4 mb-2 p-4 text-gray-600">
          <markdown-supported />
        </div>

        <el-form-item
          :label="t('bug.stepsToReproduce')"
          prop="reproduce"
          required
        >
          <el-input
            v-model="form.reproduce"
            class="font-mono"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10 }"
          />
        </el-form-item>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item :label="t('bug.expected')" prop="expected" required>
              <el-input
                v-model="form.expected"
                class="font-mono"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 10 }"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              :label="t('bug.actuallyHappening')"
              prop="actual"
              required
            >
              <el-input
                v-model="form.actual"
                class="font-mono"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 10 }"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item :label="t('bug.additionalComments')" prop="additional">
          <el-input
            v-model="form.additional"
            class="font-mono"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10 }"
          />
        </el-form-item>

        <el-form-item>
          <div class="flex">
            <el-button
              class="flex-grow-0"
              type="primary"
              size="large"
              @click="handlePreview"
            >
              {{ t('preview') }}
            </el-button>
            <div class="flex-1 text-right">
              <el-button type="danger" plain size="mini" @click="reset">
                {{ t('resetForm') }}
              </el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

  <issue-preview v-model="preview" :form="form" />
</template>

<style lang="less" scoped>
.content {
  :deep(.el-form--label-top .el-form-item__label) {
    padding-bottom: 0;
  }

  :deep(.el-form-item--small.el-form-item) {
    margin-bottom: 8px;
  }

  :deep(a) {
    text-decoration: none;
    color: var(--el-color-primary);
  }

  .sub-title {
    border-bottom: 1px solid var(--el-border-color-base);
    color: #333;
    padding-bottom: 0.25rem;
    margin: 1rem 0 0.5rem 0;
  }
}
</style>
