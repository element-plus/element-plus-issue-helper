<script setup lang="ts">
import { useComponentList, buildTools, bugTypes } from '@/hooks/forms'
import { useSupportedEpVersion, useSupportedVueVersion } from '@/utils'
import { useTexts } from '@/hooks/texts'
import type { FormBugReport } from '@/hooks/forms'

const props = defineProps<{
  form: FormBugReport
}>()
const emit = defineEmits<{
  (name: 'update:form', form: FormBugReport): void
}>()

const form = $(useVModel(props, 'form', emit))
const { t } = useI18n()
const { ReproductionLink, MarkdownSupported } = useTexts()

const userAgent = navigator.userAgent
const epVersions = useSupportedEpVersion()
const vueVersions = useSupportedVueVersion()

const components = useComponentList(
  epVersions,
  computed(() => form.epVersion)
)

let componentsLimit = $ref(5)

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
  <el-form-item :label="t('bug.type')" prop="bugReport.bugType" required>
    <el-select v-model="form.bugType" clearable>
      <el-option
        v-for="bugType in bugTypes"
        :key="bugType"
        :value="bugType"
        :label="bugType"
      />
    </el-select>
  </el-form-item>

  <h2 class="sub-title">{{ t('bug.environment') }}</h2>

  <el-row :gutter="16">
    <el-col :span="12">
      <el-form-item
        :label="t('bug.elementPlusVersion')"
        prop="bugReport.epVersion"
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
        prop="bugReport.vueVersion"
        required
      >
        <el-select v-model="form.vueVersion" clearable style="width: 100%">
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
      <el-form-item
        :label="t('bug.browserOS')"
        prop="bugReport.browser"
        required
      >
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
      <el-form-item
        :label="t('bug.buildTool')"
        prop="bugReport.buildTool"
        required
      >
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
    prop="bugReport.components"
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
    prop="bugReport.reproductionLink"
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
    prop="bugReport.reproduce"
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
      <el-form-item
        :label="t('bug.expected')"
        prop="bugReport.expected"
        required
      >
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
        prop="bugReport.actual"
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
</template>

<style lang="less" scoped>
.sub-title {
  border-bottom: 1px solid var(--el-border-color-base);
  color: #333;
  padding-bottom: 0.25rem;
  margin: 1rem 0 0.5rem 0;
}
</style>
