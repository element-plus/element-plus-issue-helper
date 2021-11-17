<script setup lang="ts">
import * as texts from '@/texts'
import { getVersions } from '@/utils'
import { useForm, buildTools } from '../hooks/forms'
import IssuePreview from './issue-preview.vue'

const userAgent = navigator.userAgent
const exampleMarkdwonWrapper = `
\`\`\`vue
// code here
\`\`\``.trim()
const epVersions = getVersions('element-plus')
const vueVersions = getVersions('vue')

let preview = $ref(false)

const handlePreview = async () => {
  await form$.validate()
  preview = true

  // const template = templateBugReport(form)
  // console.log(template)
}

let { form$, form, rules, reset } = $(useForm())
</script>

<template>
  <el-row class="content" justify="center">
    <el-col :xs="18" :sm="18" :md="12">
      <div class="bg-#ecf5ff rounded-lg my-4 p-4">
        <h1 class="my-1 fw-400">Before You Start...</h1>
        <p class="leading-6" v-html="texts.beforeYouStart" />
        <a class="text-base" tabindex="-1">Why are we so strict about this?</a>
      </div>

      <el-form
        ref="form$"
        :model="form"
        :rules="rules"
        size="small"
        label-position="top"
      >
        <el-form-item label="This is a" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio-button label="bug-report">Bug Report</el-radio-button>
            <el-radio-button label="feature-request">
              Feature Request
            </el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Issue title" prop="title" required>
          <el-input v-model="form.title" />
        </el-form-item>

        <h2 class="sub-title">Enviroment</h2>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item
              label="Element Plus Version"
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
                Check if the issue is reproducible with the latest stable
                version of Element Plus.
              </p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Vue Version" prop="vueVersion" required>
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
                Check if the issue is reproducible with the latest stable
                version of Vue.
              </p>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Browser / OS" prop="browser" required>
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
            <el-form-item label="Build Tool" prop="buildTool" required>
              <el-radio-group v-model="form.buildTool">
                <el-radio v-for="name in buildTools" :key="name" :label="name">
                  {{ name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <h2 class="sub-title">Reproduction</h2>

        <el-form-item label="Which component?" prop="componentName" required>
          <el-input
            v-model="form.componentName"
            placeholder="kebab-base, use commas to separate. e.g. el-button, el-menu-item"
          />
        </el-form-item>

        <el-form-item
          label="Link to minimal reproduction"
          prop="reproductionLink"
          required
        >
          <el-input v-model="form.reproductionLink" />
          <div v-html="texts.reproductionLink" />
        </el-form-item>

        <div class="bg-#fdf6ec rounded-lg mt-4 mb-2 p-4 text-gray-600">
          <div v-html="texts.markdownSupported" />
          <el-input
            class="font-mono"
            :model-value="exampleMarkdwonWrapper"
            type="textarea"
            autosize
            readonly
          />
        </div>

        <el-form-item label="Steps to reproduce" prop="reproduce" required>
          <el-input
            v-model="form.reproduce"
            class="font-mono"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10 }"
          />
        </el-form-item>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="What is expected?" prop="expected" required>
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
              label="What is actually happening?"
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

        <el-form-item
          label="Any additional comments? (optional)"
          prop="additional"
        >
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
              Preview
            </el-button>
            <div class="flex-1 text-right">
              <el-button class="" size="mini" @click="reset">Reset</el-button>
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
